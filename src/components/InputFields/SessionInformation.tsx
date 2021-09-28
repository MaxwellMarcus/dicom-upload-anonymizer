import { SessionInformationProps } from '../../myTypes'
import styles from './SessionInformation.module.css'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Dropzone from 'react-dropzone'
import DescriptionOutlined from '@material-ui/icons/DescriptionOutlined'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'

const SessionInformation: React.FC<SessionInformationProps> = ({
  onProjectBlur,
  setSubjectId,
  setDateTime,
  pdfFile,
  onPdfUpload,
  onPdfDiscard,
  isDateTimeInputRequired,
}: SessionInformationProps) => {
  const helpTooltip = (labelText: string, toolTipText: string) => {
    return (
      <>
        {labelText + ' '}{' '}
        <Tooltip
          title={toolTipText}
          placement='right'
          arrow
          classes={{ tooltip: styles.tooltip }}
        >
          <HelpIcon className={styles.helpIcon} />
        </Tooltip>
      </>
    )
  }
  return (
    <form
      className={`${styles.inputPadding} ${styles.stepperStep}`}
      noValidate
      autoComplete='off'
    >
      <Grid container className={styles.gridContainer}>
        <Grid item xs={5}>
          <TextField
            onBlur={(event) => onProjectBlur(event.target.value)}
            id='project'
            label={helpTooltip(
              'Performance Site ID',
              'Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##',
            )}
            variant='outlined'
            autoFocus={true}
            size='small'
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
              style: { pointerEvents: 'auto' },
            }}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <TextField
            onChange={(event) => setSubjectId(event.target.value)}
            id='subject'
            label={helpTooltip(
              'Subject ID',
              'Enter the Subject ID as noted on the metadata form',
            )}
            variant='outlined'
            size='small'
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
              style: { pointerEvents: 'auto' },
            }}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <TextField
            id='datetime-local'
            label={helpTooltip(
              'Imaging Session Date and Time',
              'Enter the date and time as noted in the DICOM for study verification',
            )}
            type='datetime-local'
            variant='outlined'
            size='small'
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
              style: { pointerEvents: 'auto' },
            }}
            onChange={(event) => setDateTime(event.target.value)}
            disabled={!isDateTimeInputRequired}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={5}>
          <label className={styles.dropzoneLabel}>Metadata Form</label>

          {pdfFile.file && (
            <div className={styles.pdfInfo}>
              <DescriptionOutlined className={styles.themeBlue} />
              <span className={styles.pdfFileName}>{pdfFile.file.name}</span>
              <Button
                className={styles.pdfDiscardButton}
                variant='outlined'
                onClick={() => onPdfDiscard()}
              >
                Discard
              </Button>
            </div>
          )}

          {!pdfFile.file && (
            <>
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
                      <p className={styles.dropzoneText}>
                        Attach Metadata Form
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <p className={styles.pdfOnly}>Only PDF files accepted</p>
            </>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default SessionInformation
