import { InputFieldsProps } from '../../myTypes'
import styles from './InputFields.module.css'
import TextField from '@material-ui/core/TextField'

const InputFields: React.FC<InputFieldsProps> = ({
  onProjectBlur,
  setSubjectId,
  setDateTime,
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
        onBlur={(event) => setSubjectId(event.target.value)}
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
    </form>
  )
}

export default InputFields
