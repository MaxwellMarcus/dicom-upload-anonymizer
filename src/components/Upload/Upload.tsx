import { useState, useEffect } from 'react'
import {
  myFiles,
  myFile,
  dateTimeErrors,
  dicomTags,
  pdfFile,
} from '../../myTypes'
import {
  getSiteWideAnonScript,
  uploadFiles,
  getIsDateTimeProjectValidationRequired,
  getIsDateTimeSiteValidationRequired,
  uploadPdf,
} from '../../Services'
import { isZippedFolder, checkStudyDateTimeAndUID } from '../../utils'
import {
  LIBRARY_PARSER,
  STUDY_DATE,
  STUDY_TIME,
  STUDY_INSTANCE_UID,
  TWENTY_FIVE_MEGA_BYTES,
  uploadSteps,
} from '../../constants'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import SessionInformation from '../InputFields/SessionInformation'
import UploadButton from '../UploadButton/UploadButton'
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
  const [pdfFile, setPdfFile] = useState<pdfFile>({ file: null })

  const jsZip = new JSZip()
  let progressCounter = 0
  let totalVolume = 0
  let fileCheck: dateTimeErrors = {
    dateTimeError: false,
    studyInstanceUidError: false,
  }

  // Retrieve site-wide anon script
  useEffect(() => {
    getSiteWideAnonScript()
      .then((response: Response) => response.text())
      .then((script: string) => {
        setAnonScript(script)
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
      if (projResponse.status === 200) {
        responseValue = await projResponse.json()
        setIsDateTimeInputRequired(responseValue)
      } else {
        const siteResponse = await getIsDateTimeSiteValidationRequired()
        if (siteResponse.status === 200) {
          responseValue = await siteResponse.json()
          setIsDateTimeInputRequired(responseValue)
        }
      }
    }
  }

  const onPdfUpload = (file: Array<File>) => {
    const pdf: pdfFile = { ...pdfFile, file: file[0] }
    setPdfFile(pdf)
  }

  const onPdfDiscard = () => {
    const pdf: pdfFile = { file: null }
    setPdfFile(pdf)
  }

  const onSubmit = async () => {
    let zipToSend = new JSZip()
    let totalSize = 0

    for (let i = 0; i < files.length; i++) {
      zipToSend.file(files[i].fileName, files[i].anonymizedFile)
      totalSize += files[i].size
      const isLastChunk = i + 1 === files.length

      if (totalSize > TWENTY_FIVE_MEGA_BYTES || isLastChunk) {
        setSendingFiles(true)
        const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
        const uploadFilesResponse = await uploadFiles(
          projectId,
          subjectId,
          zippedFolder,
        )
        if (isLastChunk) {
          if (uploadFilesResponse.status === 200) {
            const response = await uploadFilesResponse.text()
            const urlFromUploadFilesResponse = response.substring(
              0,
              response.length - 2,
            )
            await uploadPdf(pdfFile, subjectId, urlFromUploadFilesResponse)
          }
        }
        setSendingFiles(false)
        zipToSend = new JSZip()
        totalSize = 0
      }
    }
  }

  const areFilesReady: boolean = files.length > 0 && files.length === totalFiles
  const isUploadDisabled = !(
    anonScript &&
    projectId &&
    subjectId &&
    !(isDateTimeInputRequired && dateTime === '')
  )

  if (areFilesReady) {
    files.forEach((file: myFile) => (totalVolume += file.size))
    if (isDateTimeInputRequired) {
      fileCheck = checkStudyDateTimeAndUID(files, dateTime)
    }
  }

  const stepsContent = [
    <SessionInformation
      key={0}
      onProjectBlur={onProjectBlur}
      setSubjectId={setSubjectId}
      setDateTime={setDateTime}
      pdfFile={pdfFile}
      onPdfUpload={onPdfUpload}
      onPdfDiscard={onPdfDiscard}
      isDateTimeInputRequired={isDateTimeInputRequired}
    />,
    <UploadButton
      key={1}
      onFileUpload={onFileUpload}
      isUploadDisabled={isUploadDisabled}
      totalVolume={totalVolume}
      totalFiles={totalFiles}
      numOfAnonomyzedFiles={numOfAnonomyzedFiles}
      fileCheck={fileCheck}
    />,
  ]

  return (
    <>
      <Stepper orientation='vertical'>
        {uploadSteps.map((label, index) => (
          <Step active={true} completed={false} key={label}>
            {label !== 'Empty Third' && <StepLabel>{label}</StepLabel>}
            <StepContent>{stepsContent[index]}</StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  )
}

export default Upload
