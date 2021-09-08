import { useState, useEffect } from 'react'
import { myFiles, myFile, dateTimeErrors, dicomTags } from '../../myTypes'
import {
  getSiteWideAnonScript,
  uploadFiles,
  getIsDateTimeProjectValidationRequired,
  getIsDateTimeSiteValidationRequired,
} from '../../Services'
import { isZippedFolder, checkStudyDateTimeAndUID } from '../../utils'
import {
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
} from '../../constants'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import InputFields from '../InputFields/InputFields'
import UploadButton from '../UploadButton/UploadButton'
import SubmitButton from '../SubmitButton/SubmitButton'

const Upload: React.FC = () => {
  const [files, setFiles] = useState<myFiles>([])
  const [numOfAnonomyzedFiles, setNumOfAnonomyzedFiles] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [anonScript, setAnonScript] = useState('')
  const [projectId, setProjectId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [sendingFiles, setSendingFiles] = useState(false)
  const [isDateTimeInputRequired, setIsDateTimeInputRequired] = useState(false)

  const jsZip = new JSZip()
  let progressCounter = 0
  let totalVolume = 0
  let fileCheck: dateTimeErrors = {
    dateTimeError: false,
    studyInstanceUidError: false,
  }

  // Retrieve site-wide anon script and parse it
  useEffect(() => {
    getSiteWideAnonScript()
      .then((response: Response) => response.text())
      .then((text: string) => {
        const scriptStart = text.indexOf('version')
        const parsedScript = text.substring(scriptStart)
        setAnonScript(parsedScript)
      })
  }, [])

  const onFileUpload = (uploaded: Array<File>) => {
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
          handleAnonymizing(reader.result as ArrayBuffer, fileName)
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
   * @returns anonymizes a single file
   */
  const handleAnonymizing = async (file: ArrayBuffer, name: string) => {
    const anonymizer = new Anonymizer(anonScript, {
      identifiers: undefined,
      lookupMap: undefined,
      inputBuffer: undefined,
      namespaceforHashUID: '',
      parserLibrary: LIBRARY_PARSER.ANTLR4,
      trace: false,
    })
    const fileName = name
    anonymizer.loadDcm(file)
    await anonymizer.applyRules()
    const outputBuffer = anonymizer.write()
    const anonymizedFile = new Blob([outputBuffer], {
      type: 'application/octet',
    })
    const size = anonymizedFile.size
    const dicomTags: dicomTags = {
      date: anonymizer.inputDict.dict[STUDY_DATE].Value[0],
      time: anonymizer.inputDict.dict[STUDY_TIME].Value[0],
      UID: anonymizer.inputDict.dict[STUDY_INSTANCE_UID].Value[0],
    }
    progressCounter++
    setFiles((files: myFiles) => [
      ...files,
      new myFile(fileName, size, dicomTags, anonymizedFile),
    ])
    setNumOfAnonomyzedFiles(progressCounter)
  }

  const onProjectBlur = async (value: string) => {
    if (value.length > 0) {
      setProjectId(value)
      let responseValue
      const projResponse = await getIsDateTimeProjectValidationRequired(value)
      if (projResponse.ok) {
        responseValue = await projResponse.json()
        setIsDateTimeInputRequired(responseValue)
      } else {
        const siteResponse = await getIsDateTimeSiteValidationRequired()
        if (siteResponse.ok) {
          responseValue = await siteResponse.json()
          setIsDateTimeInputRequired(responseValue)
        }
      }
    }
  }

  const onSubmit = async () => {
    const zipToSend = new JSZip()
    files.forEach((file: myFile) => {
      zipToSend.file(file.fileName, file.anonymizedFile)
    })
    setSendingFiles(true)
    const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
    uploadFiles(projectId, subjectId, zippedFolder).then(() => {
      setSendingFiles(false)
    })
  }

  const areFilesReady: boolean = files.length > 0 && files.length === totalFiles
  const isUploadDisabled = !(anonScript && projectId && subjectId && dateTime)

  if (areFilesReady) {
    files.forEach((file: myFile) => (totalVolume += file.size))
    fileCheck = checkStudyDateTimeAndUID(files, dateTime)
  }

  return (
    <>
      <Paper elevation={5}>
        <Box p={2}>
          <InputFields
            onProjectBlur={onProjectBlur}
            setSubjectId={setSubjectId}
            setDateTime={setDateTime}
            isDateTimeInputRequired={isDateTimeInputRequired}
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
            areFilesReady={areFilesReady}
            sendingFiles={sendingFiles}
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </>
  )
}

export default Upload
