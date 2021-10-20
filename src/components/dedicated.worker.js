import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import {
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
  MODALITY,
} from '../constants'
import { isZippedFolder, isDicomfile } from '../utils'

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
  } = message.data
  project = projectId
  subject = subjectId
  sessionLabel = session
  script = anonScript
  expectedModality = selectedModality.type
  totalFiles = 0
  filesParsed = 0

  const jsZip = new JSZip()
  if (isZippedFolder(uploaded[0])) {
    jsZip.loadAsync(uploaded[0]).then((zip) => {
      zip.forEach((relativePath, file) => {
        const fileName = file.name
        totalFiles++
        jsZip
          .file(file.name)
          .async('arraybuffer')
          .then(async (file) => {
            if (isDicomfile(file)) {
              handleAnonymizing(file, fileName)
            }
          })
      })
    })
  } else {
    totalFiles = uploaded.length
    for (let i = 0; i < totalFiles; i++) {
      const reader = new FileReader()
      const file = uploaded[i]
      const fileName = file.name

      reader.onload = function () {
        if (isDicomfile(reader.result)) {
          handleAnonymizing(reader.result, fileName)
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

const handleAnonymizing = async (file, fileName) => {
  filesParsed++
  if (isDicomfile(file)) {
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

    const dicomTags = {
      date: anonymizer.inputDict.dict[STUDY_DATE].Value[0],
      time: anonymizer.inputDict.dict[STUDY_TIME].Value[0],
      UID: anonymizer.inputDict.dict[STUDY_INSTANCE_UID].Value[0],
      modality: anonymizer.inputDict.dict[MODALITY].Value[0],
    }

    const size = anonymizedFile.size

    if (
      !(expectedModality === 'PET' && dicomTags.modality === 'MR') &&
      !(expectedModality === 'MR' && dicomTags.modality === 'PT')
    ) {
      filesArray.push({ anonymizedFile, fileName, dicomTags, size })
    }
  }

  if (filesParsed % 100 === 0 || filesParsed === totalFiles) {
    postMessage({ filesArray, totalFiles, filesParsed })
    filesArray = []
  }
}

export default self
