import { UploadButtonProps } from '../../myTypes'
import Dropzone from 'react-dropzone'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined'
import Grid from '@material-ui/core/Grid'
import styles from './UploadButton.module.css'

const UploadButton: React.FC<UploadButtonProps> = ({
  onFileUpload,
  fileCheck,
}: UploadButtonProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <label className={styles.dropzoneLabel}>Imaging Files</label>
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
                  De-identification process begins immediately.
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <p className={styles.infoText}>
          Imaging session date and time must match the DICOM for verification.
        </p>
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

export default UploadButton
