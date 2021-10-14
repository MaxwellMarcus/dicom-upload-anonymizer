import { useState } from 'react'
import { myFiles, UploadProps, uploadProgressProps } from '../../myTypes'
import { getFolderName, numberOfChunks } from '../../utils'
import { TWENTY_FIVE_MEGA_BYTES, uploadSteps } from '../../constants'
import myWorker from '../dedicated.worker'
import JSZip from 'jszip'
import { FileWithPath } from 'react-dropzone'
import styles from './Upload.module.css'
import PageFooter from '../PageFooter/PageFooter'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import SessionInformation from '../SessionInformation/SessionInformation'
import ImagingData from '../ImagingData/ImagingData'

/* eslint-disable */
// @ts-ignore: possibly undefined
const worker = new myWorker()

const Upload: React.FC<UploadProps> = ({
  anonScript,
  checkIfDateTimeRequired,
  availableProjects,
  handleUploadFiles,
  handleUploadPdf,
}: UploadProps) => {
  const [files, setFiles] = useState<myFiles>([])
  const [numOfAnonomyzedFiles, setNumOfAnonomyzedFiles] = useState(0)
  const [totalFiles, setTotalFiles] = useState(0)
  const [projectId, setProjectId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [sendingFiles, setSendingFiles] = useState(false)
  const [isDateTimeInputRequired, setIsDateTimeInputRequired] = useState(true)
  const [pdfFile, setPdfFile] = useState<File>(null)
  const [folderName, setFolderName] = useState('')
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<uploadProgressProps>({
    totalNumberOfChunks: 0,
    chunksSent: 0,
  })

  let initialIsDateTimeInputRequired = true

  worker.onmessage = (message: any) => {
    const { filesArray, totalFiles } = message.data
    setFiles((current: myFiles) => [...current, ...filesArray])
    setTotalFiles(totalFiles)
    setNumOfAnonomyzedFiles((current) => current + filesArray.length)
  }

  const onFileUpload = (uploaded: Array<FileWithPath>) => {
    setFolderName(getFolderName(uploaded[0].path))
    worker.postMessage({ uploaded, anonScript })
  }

  const onProjectChange = async (value: string) => {
    if (value.length > 0) {
      const dateTimeValidation = await checkIfDateTimeRequired(value)
      setIsDateTimeInputRequired(dateTimeValidation)
      initialIsDateTimeInputRequired = dateTimeValidation
      setProjectId(value)
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
    setDateTime('')
    setIsDateTimeInputRequired(initialIsDateTimeInputRequired)
    setPdfFile(null)
    setFolderName('')
    setNumOfAnonomyzedFiles(0)
    setUploadProgress({ totalNumberOfChunks: 0, chunksSent: 0 })
  }

  const discardDicomFiles = () => {
    setFiles([])
    setTotalFiles(0)
    setFolderName('')
    setNumOfAnonomyzedFiles(0)
  }

  const readyToUpload =
    projectId &&
    subjectId &&
    dateTime &&
    pdfFile &&
    files &&
    numOfAnonomyzedFiles > 0 &&
    totalFiles === numOfAnonomyzedFiles

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
      pdfFile={pdfFile}
      onPdfUpload={onPdfUpload}
      onPdfDiscard={onPdfDiscard}
      isDateTimeInputRequired={isDateTimeInputRequired}
      pdfModalOpen={pdfModalOpen}
      setPdfModalOpen={setPdfModalOpen}
    />,
    <ImagingData
      key={1}
      files={files}
      dateTime={dateTime}
      onFileUpload={onFileUpload}
      totalFiles={totalFiles}
      numOfAnonomyzedFiles={numOfAnonomyzedFiles}
      folderName={folderName}
      discardDicomFiles={discardDicomFiles}
      isDateTimeInputRequired={isDateTimeInputRequired}
    />,
  ]

  const isCompleted = (index: number): boolean => {
    return (
      !!(index === 0 && projectId && subjectId && dateTime && pdfFile) ||
      !!(
        index === 1 &&
        numOfAnonomyzedFiles > 0 &&
        numOfAnonomyzedFiles === totalFiles
      )
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
            {label !== 'Empty Third' && <StepLabel>{label}</StepLabel>}
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
