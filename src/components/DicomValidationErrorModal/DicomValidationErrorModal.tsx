import {
  errorsWithUploadedFiles,
  DicomValidationErrorModalProps,
} from '../../myTypes'
import { verifyUploadedFiles } from '../../utils'
import styles from './DicomValidationErrorModal.module.css'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const DicomValidationErrorModal: React.FC<DicomValidationErrorModalProps> = ({
  files,
  dateTime,
  areFilesReady,
  discardDicomFiles,
  isDateTimeInputRequired,
  isModalityRequired,
  selectedModality,
}: DicomValidationErrorModalProps) => {
  let fileCheck: errorsWithUploadedFiles = {
    dateTimeError: false,
    dateTimeErrorFiles: [],
    studyInstanceUidError: false,
    expectedModality: '',
    expectedModalityNotFound: false,
  }

  if (areFilesReady) {
    fileCheck = verifyUploadedFiles(
      files,
      isDateTimeInputRequired,
      dateTime,
      isModalityRequired,
      selectedModality,
    )
  }

  const onClose = () => {
    discardDicomFiles()
  }

  const showDateTimeErrorInfo = fileCheck.dateTimeError
  const showUidErrorInfo =
    !fileCheck.dateTimeError && fileCheck.studyInstanceUidError
  const showModalityErrorInfo =
    !fileCheck.dateTimeError &&
    !fileCheck.studyInstanceUidError &&
    fileCheck.expectedModalityNotFound

  return (
    <div>
      <Dialog
        open={
          fileCheck.dateTimeError ||
          fileCheck.studyInstanceUidError ||
          showModalityErrorInfo
        }
        onClose={onClose}
        scroll={'paper'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        className={styles.background}
        maxWidth={'xs'}
      >
        <div className={styles.title}>
          <DialogTitle id='scroll-dialog-title'>
            {showDateTimeErrorInfo && 'Time Stamp Verification Failed'}
            {showUidErrorInfo && 'Multiple Instance UIDs Found'}
            {showModalityErrorInfo && 'Expected Modality Not Found'}
          </DialogTitle>
          <IconButton
            aria-label='close'
            className={styles.closeIconButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers={true}>
          <DialogContentText
            className={styles.bodyContent}
            id='scroll-dialog-description'
            tabIndex={-1}
          >
            {showDateTimeErrorInfo && (
              <>
                <div className={styles.errorText}>
                  <p>Date and/or Time Verification Failed</p>
                  <p>
                    All contents of a folder or zip archive must have a study
                    date and time that matches the DICOM.
                  </p>
                </div>
                <div className={styles.infoText}>
                  <p>
                    All files were removed. Please ensure you have selected the
                    correct session for upload.
                  </p>
                </div>
                <p className={styles.fileCount}>
                  {fileCheck.dateTimeErrorFiles.length} Mismatched Time Stamp
                  Files
                </p>
                <div className={styles.fileListBox}>
                  {fileCheck.dateTimeErrorFiles.map((file, index) => (
                    <p key={index}>{file.filename}</p>
                  ))}
                </div>
              </>
            )}
            {showUidErrorInfo && (
              <>
                <div className={styles.errorText}>
                  <p>
                    All contents of a folder or zip archive must have the same
                    Study Instance UID
                  </p>
                </div>
                <div className={styles.infoText}>
                  <p>
                    All files were removed. Please reupload your scan with the
                    correct session containing the same study instance UIDs.
                  </p>
                </div>
              </>
            )}
            {showModalityErrorInfo && (
              <>
                <div className={styles.errorText}>
                  <p>
                    {`You selected ${selectedModality.display} as the expected modality, but no
                    instances of it were found in the uploaded files.`}
                  </p>
                </div>
                <div className={styles.infoText}>
                  <p>
                    All files were removed. Please reupload your scan with the
                    correct session containing the expected dicom file type.
                  </p>
                </div>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='outlined' className={styles.ok}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DicomValidationErrorModal
