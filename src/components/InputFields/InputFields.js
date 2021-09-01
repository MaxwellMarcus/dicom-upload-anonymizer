import PropTypes from 'prop-types'
import styles from './InputFields.module.css'
import TextField from '@material-ui/core/TextField'

const InputFields = ({ setProjectId, setSubjectId, setDateTime }) => {
  return (
    <form className={styles.inputPadding} noValidate autoComplete='off'>
      <TextField
        onChange={(event) => setProjectId(event.target.value)}
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
        label='Date-Time verification'
        type='datetime-local'
        variant='outlined'
        className={styles.dateTimePicker}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => setDateTime(event.target.value)}
      />
    </form>
  )
}

export default InputFields

InputFields.propTypes = {
  setProjectId: PropTypes.func,
  setSubjectId: PropTypes.func,
  setDateTime: PropTypes.func,
}
