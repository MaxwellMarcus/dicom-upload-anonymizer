import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import styles from './UploadButton.module.css'
import { formatFileSize } from '../../utils'

const UploadButton = ({
  onFileUpload,
  isUploadDisabled,
  totalVolume,
  totalFiles,
  numOfAnonomyzedFiles,
  fileOutsideRange,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper elevation={5}>
          <Dropzone
            disabled={isUploadDisabled}
            onDrop={(acceptedFiles) => onFileUpload(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section
                className={`${styles.centerText} ${
                  isUploadDisabled ? styles.disabled : ''
                }`}
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isUploadDisabled && (
                    <p>Fill out the above fields to upload files</p>
                  )}
                  {!isUploadDisabled && (
                    <p>
                      Drag&apos;n&apos;drop some files here, or click to select
                      files
                    </p>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <p>
          <b>{formatFileSize(totalVolume)}</b> total upload size
        </p>
        <p>
          <b>{totalFiles}</b> file(s) selected
        </p>
        <p>
          <b>{numOfAnonomyzedFiles}</b> file(s) anonymized
        </p>
      </Grid>

      <Grid item xs={12}>
        {!!fileOutsideRange && <p>{fileOutsideRange}</p>}
      </Grid>
    </Grid>
  )
}

export default UploadButton

UploadButton.propTypes = {
  onFileUpload: PropTypes.func,
  isUploadDisabled: PropTypes.bool,
  totalVolume: PropTypes.number,
  totalFiles: PropTypes.number,
  numOfAnonomyzedFiles: PropTypes.number,
  fileOutsideRange: PropTypes.string,
}
