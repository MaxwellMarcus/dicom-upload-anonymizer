import { InputFieldsProps } from '../../myTypes'
import styles from './InputFields.module.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
      <TextField
        onBlur={(event) => onProjectBlur(event.target.value)}
        id='project'
        label='Project ID'
        variant='outlined'
        autoFocus={true}
      />
      <TextField
        onChange={(event) => setSubjectId(event.target.value)}
        id='subject'
        label='Subject ID'
        variant='outlined'
      />
      <TextField
        id='datetime-local'
        label={
          isDateTimeInputRequired
            ? 'Date-Time verification'
            : 'Date-Time verify NOT required'
        }
        type='datetime-local'
        variant='outlined'
        className={styles.dateTimePicker}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setDateTime(event.target.value)}
        disabled={!isDateTimeInputRequired}
      />

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
    </form>
  )
}

export default InputFields
