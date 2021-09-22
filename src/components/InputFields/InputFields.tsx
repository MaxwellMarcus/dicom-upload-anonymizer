import { InputFieldsProps } from '../../myTypes'
import '../../index.css'
import styles from './InputFields.module.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core'

const InputFields: React.FC<InputFieldsProps> = ({
  onProjectBlur,
  setSubjectId,
  setDateTime,
  onPdfUpload,
  pdfFile,
  isDateTimeInputRequired,
}: InputFieldsProps) => {
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
          <input
            accept='application/pdf'
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
            type='file'
            onChange={(event) => onPdfUpload(event.target.files[0])}
          />
          <label htmlFor='raised-button-file'>
            <Button variant='outlined' component='span'>
              {pdfFile.fileName ? pdfFile.fileName : 'Upload PDF'}
            </Button>
          </label>
        </Grid>
      </Grid>
    </form>
  )
}

export default InputFields
