import { SessionInformationProps } from '../../myTypes'
import styles from './SessionInformation.module.css'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Dropzone from 'react-dropzone'
import DescriptionOutlined from '@material-ui/icons/DescriptionOutlined'

const SessionInformation: React.FC<SessionInformationProps> = ({
  onProjectBlur,
  setSubjectId,
  setDateTime,
  onPdfUpload,
  isDateTimeInputRequired,
}: SessionInformationProps) => {
  return (
    <form className={styles.inputPadding} noValidate autoComplete='off'>
      <Grid container>
        <Grid item xs={5}>
          <TextField
            onBlur={(event) => onProjectBlur(event.target.value)}
            id='project'
            label='Performance Site ID'
            variant='outlined'
            autoFocus={true}
            size='small'
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <TextField
            onChange={(event) => setSubjectId(event.target.value)}
            id='subject'
            label='Subject ID'
            variant='outlined'
            size='small'
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <TextField
            id='datetime-local'
            label='Imaging Session Date and Time'
            type='datetime-local'
            variant='outlined'
            size='small'
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setDateTime(event.target.value)}
            disabled={!isDateTimeInputRequired}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <label className={styles.dropzoneLabel}>Metadata Form</label>
          <Dropzone
            accept='.pdf'
            maxFiles={1}
            onDrop={(acceptedFiles) => onPdfUpload(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section className={styles.dropzone}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={styles.icon}>
                    <DescriptionOutlined
                      style={{ fontSize: 50 }}
                      className={`${styles.icon} ${styles.themeBlue}`}
                    />
                  </p>
                  <p className={styles.dropzoneText}>Attach Metadata Form</p>
                </div>
              </section>
            )}
          </Dropzone>
          <p className={styles.pdfOnly}>Only PDF files accepted</p>
        </Grid>
      </Grid>
    </form>
  )
}

export default SessionInformation
