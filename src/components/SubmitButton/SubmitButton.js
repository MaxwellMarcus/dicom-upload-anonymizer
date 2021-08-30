import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const SubmitButton = ({
  isUploadDisabled,
  fileOutsideRange,
  areFilesReady,
  sendingFiles,
  onSubmit,
}) => {
  return (
    <>
      {!isUploadDisabled && !fileOutsideRange && areFilesReady && (
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
  fileOutsideRange: PropTypes.string,
  areFilesReady: PropTypes.bool,
  sendingFiles: PropTypes.bool,
  onSubmit: PropTypes.func,
}
