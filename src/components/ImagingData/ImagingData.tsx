import { ImagingDataProps } from '../../myTypes'
import Dropzone from 'react-dropzone'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import styles from './ImagingData.module.css'
import DicomValidationErrorModal from '../DicomValidationErrorModal/DicomValidationErrorModal'

const ImagingData: React.FC<ImagingDataProps> = ({
  files,
  dateTime,
  onFileUpload,
  totalFiles,
  numOfAnonomyzedFiles,
  folderName,
  discardDicomFiles,
  isDateTimeInputRequired,
}: ImagingDataProps) => {
  const anonProgress =
    numOfAnonomyzedFiles > 0
      ? Math.ceil((numOfAnonomyzedFiles / totalFiles) * 100)
      : 0

  const areFilesReady =
    numOfAnonomyzedFiles > 0 && numOfAnonomyzedFiles === totalFiles

  return (
    <Grid container spacing={3}>
      <Grid item xs={7} style={{ paddingLeft: '2rem' }}>
        <label className={styles.dropzoneLabel}>
          Imaging Files
          <span className={styles.required}> *</span>
        </label>

        {!folderName && (
          <>
            <Dropzone
              onDrop={(acceptedFiles) => onFileUpload(acceptedFiles)}
              disabled={!dateTime}
            >
              {({ getRootProps, getInputProps }) => (
                <section
                  className={`${styles.dropzone} ${
                    dateTime ? '' : styles.dropzoneDisabled
                  }`}
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className={styles.icon}>
                      <FolderOutlinedIcon
                        style={{ fontSize: 50 }}
                        className={`${styles.icon} ${styles.themeBlue}`}
                      />
                    </p>
                    <p className={styles.dropzoneTopText}>
                      Add a folder or zip archive.
                    </p>
                    <p className={styles.dropzoneBottomText}>
                      De-Identification process begins immediately.
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <p className={styles.infoText}>
              Imaging session date and time must match the DICOM for
              verification.
            </p>
          </>
        )}
        {folderName && totalFiles && (
          <div className={styles.anonInfo}>
            <FolderOutlinedIcon
              style={{ fontSize: 20 }}
              className={styles.icon}
            />
            {!areFilesReady && (
              <span>
                {' '}
                {totalFiles} files in {folderName} - De-Identifying dicom files
              </span>
            )}
            {areFilesReady && (
              <span>
                {' '}
                {files.length} files in {folderName} de-identified &amp;
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
      />
    </Grid>
  )
}

export default ImagingData
