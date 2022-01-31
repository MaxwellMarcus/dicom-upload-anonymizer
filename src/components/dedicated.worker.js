import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import {
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
  MODALITY,
} from '../constants'
import { isZippedFolder, isDicomfile, fileSizeBytesToGigs } from '../utils'

let project = ''
let subject = ''
let sessionLabel = ''
let script = ''
let filesArray = []
let totalFiles = 0
let filesParsed = 0
let expectedModality = ''

self.onmessage = async (message) => {
  const {
    projectId,
    subjectId,
    session,
    uploaded,
    anonScript,
    selectedModality,
    anonymize,
  } = message.data
  project = projectId
  subject = subjectId
  sessionLabel = session
  script = anonScript
  expectedModality = selectedModality.type
  totalFiles = 0
  filesParsed = 0

  if (anonymize) {
    totalFiles = uploaded.length
    uploaded.forEach(handleAnonymizing)
  } else {
    const jsZip = new JSZip()
    if (isZippedFolder(uploaded[0])) {
      const zipSize = fileSizeBytesToGigs(uploaded[0].size)
      if (zipSize < 1.5) {
        jsZip.loadAsync(uploaded[0]).then((zip) => {
          zip.forEach((relativePath, file) => {
            const fileName = file.name
            console.log(fileName)
            totalFiles++
            jsZip
              .file(file.name)
              .async('arraybuffer')
              .then(async (file) => {
                console.log(file)
                if (isDicomfile(file)) {
                  handleFiles(file, fileName)
                }
              })
          })
        })
      } else {
        postMessage({
          sizeError: `The max Zip size is 1.50GB - the zip you uploaded was ${zipSize}GB`,
        })
      }
    } else {
      totalFiles = uploaded.length
      for (let i = 0; i < totalFiles; i++) {
        const reader = new FileReader()
        const file = uploaded[i]
        const fileName = file.name

        reader.onload = function () {
          if (isDicomfile(reader.result)) {
            console.log(reader.result)
            handleFiles(reader.result, fileName)
          }
        }

        try {
          reader.readAsArrayBuffer(file)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}

const handleFiles = async (file, fileName) => {
  filesParsed++;
  if (isDicomfile(file)) {
    filesArray.push({anonymizedFile: new Blob([file]), fileName: fileName, dicomTags: {}, size: file.size})
  }

  if (filesParsed % 100 === 0 || filesParsed === totalFiles) {
    postMessage({filesArray, totalFiles, filesParsed})
    filesArray = []
  }
}

const handleAnonymizing = async (fileObj) => {
  const fileName = fileObj.fileName;
  console.log(fileObj.anonymizedFile)
  const file = await fileObj.anonymizedFile.arrayBuffer();

  filesParsed++
  console.log(100 * filesParsed / totalFiles)
  if (filesParsed) {
    console.log("IS DICOM")
    const anonymizer = new Anonymizer(script, {
      identifiers: {
        project: project,
        subject: subject,
        session: sessionLabel,
      },
      lookupMap: undefined,
      inputBuffer: undefined,
      namespaceforHashUID: '',
      parserLibrary: LIBRARY_PARSER.ANTLR4,
      trace: false,
    })
    anonymizer.loadDcm(file)
    await anonymizer.applyRules()
    const outputBuffer = anonymizer.write()
    const anonymizedFile = new Blob([outputBuffer], {
      type: 'application/octet',
    })

    // const anonymizedFile = new Blob([file])
  //
    const dicomTags = {
      date: anonymizer.inputDict.dict[STUDY_DATE].Value[0],
      time: anonymizer.inputDict.dict[STUDY_TIME].Value[0],
      UID: anonymizer.inputDict.dict[STUDY_INSTANCE_UID].Value[0],
      modality: anonymizer.inputDict.dict[MODALITY].Value[0],
    }
  //
    const size = file.size

    if (
      !(expectedModality === 'PET' && dicomTags.modality === 'MR') &&
      !(expectedModality === 'MR' && dicomTags.modality === 'PT')
    ) {
      filesArray.push({ anonymizedFile, fileName, dicomTags, size })
    }
  }

  if (filesParsed % 100 === 0 || filesParsed === totalFiles) {
    console.log(filesArray, totalFiles, filesParsed);
    postMessage({ filesArray, totalFiles, filesParsed })
    filesArray = []
  }
}

export default self
