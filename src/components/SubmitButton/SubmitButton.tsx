import { SubmitButtonProps } from '../../myTypes'
import Button from '@material-ui/core/Button'

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isUploadDisabled,
  fileCheck,
  areFilesReady,
  sendingFiles,
  onSubmit,
}: SubmitButtonProps) => {
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
