import { useState, useEffect } from 'react'
import { getSiteWideAnonScript, uploadFiles } from '../../Services'
import {
  isZippedFolder,
  checkStudyDateTimeAndUID,
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
} from '../../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import InputFields from '../InputFields/InputFields'
import UploadButton from '../UploadButton/UploadButton'
import SubmitButton from '../SubmitButton/SubmitButton'

function Upload() {
  // file - {fileName, size, dicomTags, anonymizedFile}
  const [files, setFiles] = useState([])
  const [numOfAnonomyzedFiles, setNumOfAnonomyzedFiles] = useState(null)
  const [totalFiles, setTotalFiles] = useState(null)
  const [anonScript, setAnonScript] = useState(null)
  const [projectId, setProjectId] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [dateTime, setDateTime] = useState(null)
  const [sendingFiles, setSendingFiles] = useState(false)

  const jsZip = new JSZip()
  let progressCounter = 0
  let totalVolume = 0
  let fileCheck = { dateTimeError: false, studyInstanceUidError: false }

  // Retrieve site-wide anon script and parse it
  useEffect(() => {
    getSiteWideAnonScript()
      .then((response) => response.text())
      .then((text) => {
        const scriptStart = text.indexOf('version')
        const parsedScript = text.substring(scriptStart)
        setAnonScript(parsedScript)
      })
  }, [])

  const onFileUpload = (uploaded) => {
    if (isZippedFolder(uploaded[0])) {
      let totalCounter = 0
      jsZip.loadAsync(uploaded[0]).then((zip) => {
        zip.forEach((relativePath, file) => {
          if (relativePath.includes('dcm')) {
            totalCounter++
            const fileName = file.name
            // const lastModified = new Date(file.date).getTime()
            jsZip
              .file(file.name)
              .async('arraybuffer')
              .then(async (file) => {
                handleAnonymizing(file, fileName)
              })
          }
        })
        setTotalFiles(totalCounter)
      })
    } else {
      for (let i = 0; i < uploaded.length; i++) {
        setTotalFiles(uploaded.length)
        const reader = new FileReader()
        const file = uploaded[i]
        const fileName = file.name
        // const lastModified = file.lastModified

        reader.onload = function () {
          handleAnonymizing(reader.result, fileName)
        }

        try {
          reader.readAsArrayBuffer(file)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  /**
   *
   * @param {File} File the File object to anonymize
   * @param {string} Name the name of the file
   * @returns the new anonymized 'file'
   */
  const handleAnonymizing = async (file, name) => {
    const anonymizer = new Anonymizer(anonScript, {
      parserLibrary: LIBRARY_PARSER.ANTLR4,
    })
    const fileName = name
    anonymizer.loadDcm(file)
    await anonymizer.applyRules()
    const outputBuffer = anonymizer.write()
    const anonymizedFile = new Blob([outputBuffer], {
      type: 'application/octet',
    })
    const size = anonymizedFile.size
    const dicomTags = {
      date: anonymizer.inputDict.dict[STUDY_DATE].Value[0],
      time: anonymizer.inputDict.dict[STUDY_TIME].Value[0],
      UID: anonymizer.inputDict.dict[STUDY_INSTANCE_UID].Value[0],
    }
    progressCounter++
    setFiles((files) => [
      ...files,
      { fileName, size, dicomTags, anonymizedFile },
    ])
    setNumOfAnonomyzedFiles(progressCounter)
  }

  const onSubmit = async () => {
    const zipToSend = new JSZip()
    files.forEach((file) => {
      zipToSend.file(file.fileName, file.anonymizedFile)
    })
    setSendingFiles(true)
    const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
    uploadFiles(projectId, subjectId, zippedFolder).then(() => {
      setSendingFiles(false)
    })
  }

  if (files.length === totalFiles) {
    files.forEach((file) => (totalVolume += file.size))
    fileCheck = checkStudyDateTimeAndUID(files, dateTime)
  }

  const isUploadDisabled = !(anonScript && projectId && subjectId && dateTime)

  return (
    <>
      <Paper elevation={5}>
        <Box p={2}>
          <InputFields
            setProjectId={setProjectId}
            setSubjectId={setSubjectId}
            setDateTime={setDateTime}
          />

          <UploadButton
            onFileUpload={onFileUpload}
            isUploadDisabled={isUploadDisabled}
            totalVolume={totalVolume}
            totalFiles={totalFiles}
            numOfAnonomyzedFiles={numOfAnonomyzedFiles}
            fileCheck={fileCheck}
          />

          <SubmitButton
            isUploadDisabled={isUploadDisabled}
            fileCheck={fileCheck}
            areFilesReady={files.length === totalFiles}
            sendingFiles={sendingFiles}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </>
  )
}

export default Upload
