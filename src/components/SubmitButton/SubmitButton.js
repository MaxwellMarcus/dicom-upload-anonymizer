import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const SubmitButton = ({
  isUploadDisabled,
  fileCheck,
  areFilesReady,
  sendingFiles,
  onSubmit,
}) => {
  return (
    <>
      {!isUploadDisabled &&
        !fileCheck.dateTimeError &&
        !fileCheck.studyInstanceUidError &&
        areFilesReady && (
          <form noValidate autoComplete='off'>
            <Button
              onClick={() => onSubmit()}
              disabled={sendingFiles}
              variant='contained'
              color='primary'
              size='large'
            >
              Submit Files
            </Button>
          </form>
        )}
    </>
  )
}

export default SubmitButton

SubmitButton.propTypes = {
  isUploadDisabled: PropTypes.bool,
  fileCheck: PropTypes.object,
  areFilesReady: PropTypes.bool,
  sendingFiles: PropTypes.bool,
  onSubmit: PropTypes.func,
}
