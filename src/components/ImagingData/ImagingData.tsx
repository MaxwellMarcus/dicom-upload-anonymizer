import { ImagingDataProps } from '../../myTypes'
import { useDropzone } from 'react-dropzone'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import styles from './ImagingData.module.css'
import DicomValidationErrorModal from '../DicomValidationErrorModal/DicomValidationErrorModal'
import { useEffect, useState } from 'react'

const ImagingData: React.FC<ImagingDataProps> = ({
  projectId,
  subjectId,
  files,
  dateTime,
  onFileUpload,
  totalFiles,
  numOfFilesParsed,
  folderName,
  discardDicomFiles,
  isDateTimeInputRequired,
  showVisitsAndModalities,
  selectedVisit,
  selectedModality,
  zipSizeError,
}: ImagingDataProps) => {
  const [loadingIntoMemory, setLoadingIntoMemory] = useState(false)
  const anonProgress =
    numOfFilesParsed > 0 ? Math.ceil((numOfFilesParsed / totalFiles) * 100) : 0

  const areFilesReady = numOfFilesParsed > 0 && numOfFilesParsed === totalFiles

  const DisableDropzone =
    !projectId ||
    !subjectId ||
    (isDateTimeInputRequired && !dateTime.rawinputValue) ||
    (showVisitsAndModalities && (!selectedVisit.key || !selectedModality.key))

  const onDrop = (acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles)
  }

  useEffect(() => {
    setLoadingIntoMemory(false)
  }, [folderName])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} style={{ paddingLeft: '2rem' }}>
        <label className={styles.dropzoneLabel}>
          Imaging Files
          <span className={styles.required}> *</span>
        </label>

        {!folderName && (
          <>
            <section
              className={`${styles.dropzone} ${
                DisableDropzone ? styles.dropzoneDisabled : ''
              } ${
                zipSizeError && !loadingIntoMemory ? styles.zipSizeError : ''
              }`}
            >
              <div
                {...getRootProps()}
                onDropCapture={() => setLoadingIntoMemory(true)}
              >
                <input {...getInputProps()} />
                <p className={styles.icon}>
                  <FolderOutlinedIcon
                    style={{ fontSize: 50 }}
                    className={`${styles.icon} ${styles.themeBlue}`}
                  />
                </p>
                {zipSizeError && !loadingIntoMemory && (
                  <>
                    <p className={styles.dropzoneTopText}>{zipSizeError}</p>
                    <p className={styles.dropzoneTopText}>
                      Please Drag and Drop its folder instead
                    </p>
                  </>
                )}
                {!zipSizeError && !loadingIntoMemory && (
                  <>
                    <p className={styles.dropzoneTopText}>
                      Add a folder or zip archive.
                    </p>
                    <p className={styles.dropzoneBottomText}>
                      De-Identification process begins immediately.
                    </p>
                  </>
                )}
                {loadingIntoMemory && (
                  <p className={styles.dropzoneTopText}>
                    Getting files ready...
                  </p>
                )}
              </div>
            </section>

            <p className={styles.infoText}>
              Imaging session date and time must match the DICOM for
              verification.
            </p>
          </>
        )}
        {folderName && (
          <div className={styles.anonInfo}>
            <FolderOutlinedIcon
              style={{ fontSize: 20 }}
              className={styles.icon}
            />
            {!areFilesReady && !totalFiles && (
              <span> {folderName} being loaded...</span>
            )}
            {!areFilesReady && !!totalFiles && (
              <span>
                {' '}
                {totalFiles} files in {folderName} - De-Identifying dicom files
              </span>
            )}
            {areFilesReady && (
              <span>
                {' '}
                {numOfFilesParsed} files in {folderName} de-identified &amp;
                verified
              </span>
            )}

            {areFilesReady && (
              <Button
                className={styles.dicomDiscard}
                variant='outlined'
                style={{ textTransform: 'none' }}
                onClick={() => discardDicomFiles()}
              >
                Discard
              </Button>
            )}

            <Box display='flex' alignItems='baseline'>
              <Box width='100%' marginRight={1}>
                <LinearProgress
                  variant='determinate'
                  value={anonProgress}
                  className={styles.progressBar}
                />
              </Box>
              <Box minWidth={35}>{anonProgress}%</Box>
            </Box>
          </div>
        )}
      </Grid>

      <DicomValidationErrorModal
        files={files}
        dateTime={dateTime}
        areFilesReady={areFilesReady}
        discardDicomFiles={discardDicomFiles}
        isDateTimeInputRequired={isDateTimeInputRequired}
        isModalityRequired={showVisitsAndModalities}
        selectedModality={selectedModality}
      />
    </Grid>
  )
}

export default ImagingData
