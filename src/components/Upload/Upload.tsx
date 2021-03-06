import { useState } from 'react'
import {
  myFiles,
  UploadProps,
  uploadProgressProps,
  visitsAndModaltiesProps,
  visitProps,
  emptyVisit,
  modalityProps,
  emptyModality,
  dateTimeProps,
  emptyDateTime,
} from '../../myTypes'
import { computeSession, getFolderName, numberOfChunks } from '../../utils'
import { TWENTY_FIVE_MEGA_BYTES, uploadSteps } from '../../constants'
import myWorker from '../dedicated.worker'
import JSZip from 'jszip'
import { FileWithPath } from 'react-dropzone'
import styles from './Upload.module.css'
import PageFooter from '../PageFooter/PageFooter'
import Anonymization from '../Anonymization/Anonymization'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import SessionInformation from '../SessionInformation/SessionInformation'
import ImagingData from '../ImagingData/ImagingData'
import {
  retrieveSessionNamingConvention,
  sendEmailNotification,
} from '../../Services'

/* eslint-disable */
// @ts-ignore: possibly undefined

const worker = new myWorker()

const Upload: React.FC<UploadProps> = ({
  anonScript,
  checkIfDateTimeRequired,
  availableProjects,
  handleUploadFiles,
  handleUploadPdf,
  retrieveVisitsAndModalities,
}: UploadProps) => {
  const [files, setFiles] = useState<myFiles>();//[{fileName: "1.dcm", size: 0, dicomTags: {date: "", time: "", UID: "", modality: ""}, anonymizedFile: new Blob()}])
  const [numOfFilesParsed, setNumOfFilesParsed] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [projectId, setProjectId] = useState('Test')
  const [subjectId, setSubjectId] = useState('Subject')
  const [dateTime, setDateTime] = useState<dateTimeProps>({rawinputValue: "", yyMMddFormat: "211209", date: "09/12/21", hour: "4", minute: "30"})
  const [availableVisitsAndModalities, setAvailableisitsAndModalities] =
    useState<visitsAndModaltiesProps>([])
  const [selectedVisit, setVisit] = useState<visitProps>(emptyVisit)
  const [selectedModality, setModality] = useState<modalityProps>(emptyModality)
  const [showVisitsAndModalities, setShowVisitsAndModalities] = useState(false)
  const [sendingFiles, setSendingFiles] = useState(false)
  const [isDateTimeInputRequired, setIsDateTimeInputRequired] = useState(true)
  const [pdfFile, setPdfFile] = useState<File>(null)
  const [folderName, setFolderName] = useState('')
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<uploadProgressProps>({
    totalNumberOfChunks: 0,
    chunksSent: 0,
  })
  const [session, setSession] = useState('')
  const [zipSizeError, setZipSizeError] = useState('')

  let initialIsDateTimeInputRequired = true

  worker.onmessage = (message: any) => {
    const { filesArray, totalFiles, filesParsed, sizeError } = message.data
    console.log(filesArray)
    if (sizeError) {
      discardDicomFiles()
      setZipSizeError(sizeError)
    } else {
      setFiles(filesArray)
      // setFiles((current: myFiles) => [...current, ...filesArray])
      setTotalFiles(totalFiles)
      setNumOfFilesParsed(filesParsed)
    }
  }

  const onFileUpload = async (uploaded: Array<FileWithPath>) => {
    setZipSizeError('')
    setFolderName(getFolderName(uploaded[0].path))
    const namingConvention = ""//await retrieveSessionNamingConvention(
    //   projectId,
    //   selectedVisit.key,
    // )
    // const session = computeSession(
    //   namingConvention,
    //   projectId,
    //   subjectId,
    //   dateTime,
    //   selectedVisit,
    //   selectedModality,
    // )
    // setSession(session)
    worker.postMessage({
      projectId,
      subjectId,
      session,
      uploaded,
      anonScript,
      selectedModality,
      anonymize: false,
    })
  }

  const onProjectChange = async (value: string) => {
    if (value.length > 0) {
      const dateTimeValidation = await checkIfDateTimeRequired(value)
      setIsDateTimeInputRequired(dateTimeValidation)
      initialIsDateTimeInputRequired = dateTimeValidation
      setProjectId(value)
      const visitsAndModalitiesResponse = await retrieveVisitsAndModalities(
        value,
      )
      if (visitsAndModalitiesResponse.status === 200) {
        const responseJson = await visitsAndModalitiesResponse.json()
        if (responseJson.key === '' && responseJson.name === 'NONE') {
          setShowVisitsAndModalities(false)
        } else {
          const visitsAndModalities: visitsAndModaltiesProps = responseJson
          setAvailableisitsAndModalities(visitsAndModalities)
        }
      }
    }
  }

  const onPdfUpload = (pdf: File) => {
    setPdfFile(pdf)
    setPdfModalOpen(true)
  }

  const onPdfDiscard = () => {
    setPdfFile(null)
  }

  const onSubmit = async () => {
    setUploadProgress((current) => ({
      ...current,
      totalNumberOfChunks: numberOfChunks(files),
    }))
    let zipToSend = new JSZip()
    let totalSize = 0

    for (let i = 0; i < files.length; i++) {
      zipToSend.file(files[i].fileName, files[i].anonymizedFile)
      totalSize += files[i].size
      const isLastChunk = i + 1 === files.length

      if (totalSize > TWENTY_FIVE_MEGA_BYTES || isLastChunk) {
        setSendingFiles(true)
        const zippedFolder = await zipToSend.generateAsync({ type: 'blob' })
        const uploadFilesResponse = await handleUploadFiles(
          projectId,
          subjectId,
          zippedFolder,
          selectedVisit,
          session,
        )
        if (uploadFilesResponse.status === 200) {
          setUploadProgress((current) => ({
            ...current,
            chunksSent: current.chunksSent + 1,
          }))
          if (isLastChunk) {
            const response = await uploadFilesResponse.text()
            const urlFromUploadFilesResponse = response.substring(
              0,
              response.length - 2,
            )
            await handleUploadPdf(
              pdfFile,
              subjectId,
              urlFromUploadFilesResponse,
            )
            sendEmailNotification(projectId, urlFromUploadFilesResponse)
          }
        }
        setSendingFiles(false)
        zipToSend = new JSZip()
        totalSize = 0
      }
    }
  }

  const resetAllData = () => {
    setFiles([])
    setTotalFiles(0)
    setProjectId('')
    setSubjectId('')
    setDateTime(emptyDateTime)
    setIsDateTimeInputRequired(initialIsDateTimeInputRequired)
    setVisit(emptyVisit)
    setModality(emptyModality)
    setAvailableisitsAndModalities([])
    setShowVisitsAndModalities(true)
    setPdfFile(null)
    setFolderName('')
    setNumOfFilesParsed(0)
    setUploadProgress({ totalNumberOfChunks: 0, chunksSent: 0 })
  }

  const discardDicomFiles = () => {
    setFiles([])
    setTotalFiles(0)
    setFolderName('')
    setNumOfFilesParsed(0)
  }

  const readyToUpload =
    projectId &&
    subjectId &&
    dateTime &&
    (!!(showVisitsAndModalities && selectedVisit.key && selectedModality.key) ||
      !showVisitsAndModalities) &&
    pdfFile &&
    files &&
    numOfFilesParsed > 0 &&
    totalFiles === numOfFilesParsed

  const stepsContent = [
    <SessionInformation
      key={0}
      projectId={projectId}
      subjectId={subjectId}
      dateTime={dateTime}
      availableProjects={availableProjects}
      onProjectChange={onProjectChange}
      setSubjectId={setSubjectId}
      setDateTime={setDateTime}
      showVisitsAndModalities={showVisitsAndModalities}
      availableVisitsAndModalities={availableVisitsAndModalities}
      setVisit={setVisit}
      selectedVisit={selectedVisit}
      setModality={setModality}
      selectedModality={selectedModality}
      pdfFile={pdfFile}
      onPdfUpload={onPdfUpload}
      onPdfDiscard={onPdfDiscard}
      isDateTimeInputRequired={isDateTimeInputRequired}
      pdfModalOpen={pdfModalOpen}
      setPdfModalOpen={setPdfModalOpen}
    />,
    <ImagingData
      key={1}
      projectId={projectId}
      subjectId={subjectId}
      files={files}
      dateTime={dateTime}
      onFileUpload={onFileUpload}
      totalFiles={totalFiles}
      numOfFilesParsed={numOfFilesParsed}
      folderName={folderName}
      discardDicomFiles={discardDicomFiles}
      isDateTimeInputRequired={isDateTimeInputRequired}
      showVisitsAndModalities={showVisitsAndModalities}
      selectedVisit={selectedVisit}
      selectedModality={selectedModality}
      zipSizeError={zipSizeError}
    />,
    <Anonymization key={2} files={files} anonScript={anonScript} anonWorker={worker} projectId={projectId} subjectId={subjectId} session={session} selectedModality={selectedModality}/>,
  ]

  const isCompleted = (index: number): boolean => {
    return (
      !!(
        index === 0 &&
        projectId &&
        subjectId &&
        dateTime &&
        pdfFile &&
        (!!(
          showVisitsAndModalities &&
          selectedVisit.key &&
          selectedModality.key
        ) ||
          !showVisitsAndModalities)
      ) ||
      !!(index === 1 && numOfFilesParsed > 0 && numOfFilesParsed === totalFiles)
    )
  }

  return (
    <>
      <Stepper orientation='vertical'>
        {uploadSteps.map((label, index) => (
          <Step
            active={true}
            completed={isCompleted(index)}
            key={label}
            className={styles.stepItem}
          >
            {label !== 'Empty Fourth' && <StepLabel>{label}</StepLabel>}
            <StepContent>{stepsContent[index]}</StepContent>
          </Step>
        ))}
      </Stepper>

      <PageFooter
        sendingFiles={sendingFiles}
        onSubmit={onSubmit}
        resetAllData={resetAllData}
        uploadProgress={uploadProgress}
        readyToUpload={readyToUpload}
      />
    </>
  )
}

export default Upload
