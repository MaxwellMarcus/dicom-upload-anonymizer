import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import {
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
} from '../constants'
import { isZippedFolder, isDicomfile } from '../utils'

let filesArray = []
let filesHandled = 0

self.onmessage = async (message) => {
  const { uploaded, anonScript } = message.data
  const jsZip = new JSZip()
  let totalFiles = 0
  filesHandled = 0
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
              handleAnonymizing(file, fileName, anonScript, totalFiles)
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
          handleAnonymizing(reader.result, fileName, anonScript, totalFiles)
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

const handleAnonymizing = async (file, fileName, anonScript, totalFiles) => {
  filesHandled++
  if (isDicomfile(file)) {
    const anonymizer = new Anonymizer(anonScript, {
      identifiers: undefined,
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
    }

    const size = anonymizedFile.size

    filesArray.push({ anonymizedFile, fileName, dicomTags, size })
  }

  if (filesArray.length % 100 === 0 || filesHandled === totalFiles) {
    postMessage({ filesArray, totalFiles })
    filesArray = []
  }
}

export default self
