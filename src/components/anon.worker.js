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

onmessage = async (message) => {
  const {
    projectId,
    subjectId,
    session,
    files,
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
  files.forEach(handleAnonymizing)
}

const handleAnonymizing = async (fileObj) => {
  const file = fileObj.anonymizedFile;
  const fileName = fileObj.fileName;

  filesParsed++
  console.log(100 * filesParsed / totalFiles)
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
    postMessage({ filesArray, totalFiles, filesParsed })
    filesArray = []
  }
}

export default self
