import { ImagingDataProps } from '../../myTypes'
import Dropzone from 'react-dropzone'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import styles from './ImagingData.module.css'

const ImagingData: React.FC<ImagingDataProps> = ({
  onFileUpload,
  totalFiles,
  numOfAnonomyzedFiles,
  fileCheck,
  folderName,
  areFilesReady,
  discardDicomFilesClicked,
}: ImagingDataProps) => {
  const anonProgress =
    numOfAnonomyzedFiles > 0
      ? Math.ceil((numOfAnonomyzedFiles / totalFiles) * 100)
      : 0

  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <label className={styles.dropzoneLabel}>Imaging Files</label>

        {!folderName && (
          <>
            <Dropzone onDrop={(acceptedFiles) => onFileUpload(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section className={styles.dropzone}>
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
                De-Identifying {totalFiles} files in {folderName}
              </span>
            )}
            {areFilesReady && (
              <span>
                {' '}
                {totalFiles} files in {folderName} de-identified &amp; verified
              </span>
            )}

            {areFilesReady && (
              <Button
                className={styles.dicomDiscard}
                variant='outlined'
                style={{ textTransform: 'none' }}
                onClick={() => discardDicomFilesClicked()}
              >
                Discard
              </Button>
            )}

            <Box display='flex' alignItems='baseline'>
              <Box width='100%' mr={1}>
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

      {(fileCheck.dateTimeError || fileCheck.studyInstanceUidError) && (
        <Grid item xs={12}>
          {fileCheck.dateTimeError && (
            <p className={styles.redText}>
              At least one of the uploaded files is outside the two hour window
            </p>
          )}

          {fileCheck.studyInstanceUidError && (
            <p className={styles.redText}>
              At least one of the uploaded files has a different Study Instance
              UID value
            </p>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default ImagingData
