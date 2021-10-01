import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { PdfModalProps } from '../../myTypes'
import styles from './PdfModal.module.css'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const PdfModal: React.FC<PdfModalProps> = ({
  pdfModalOpen,
  handlePdfClose,
  pdfFile,
  onPdfDiscard,
}: PdfModalProps) => {
  const [pages, setPages] = useState([])
  const [phiCheckboxChecked, setPhiCheckboxChecked] = useState(false)

  const convertToArrayOfPageNumbers = (numPages: number) => {
    const pages = []
    for (let i = 1; i <= numPages; i++) {
      pages.push(i)
    }
    setPages(pages)
  }

  const checkBoxChanged = () => {
    setPhiCheckboxChecked(!phiCheckboxChecked)
  }

  const discardandClose = () => {
    onPdfDiscard()
    handlePdfClose()
    setPhiCheckboxChecked(false)
  }

  const onComfirmNoPHI = () => {
    handlePdfClose()
    setPhiCheckboxChecked(false)
  }

  return (
    <div>
      <Dialog
        open={pdfModalOpen}
        onClose={discardandClose}
        scroll={'paper'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        className={styles.background}
        maxWidth={'md'}
      >
        <div className={styles.title}>
          <DialogTitle id='scroll-dialog-title'>
            Review Metadata Form for PHI
          </DialogTitle>
          <IconButton
            aria-label='close'
            className={styles.closeIconButton}
            onClick={discardandClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers={true}>
          <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
            {pdfModalOpen && pdfFile && (
              <Document
                file={pdfFile}
                onLoadSuccess={({ numPages }) =>
                  convertToArrayOfPageNumbers(numPages)
                }
                options={{ workerSrc: '/pdf.worker.js' }}
                loading='Loading PDF...'
              >
                {pages.map((page) => (
                  <Page pageNumber={page} key={page} />
                ))}
              </Document>
            )}
          </DialogContentText>
          <FormControlLabel
            className={styles.checkBox}
            control={
              <Checkbox
                checked={phiCheckboxChecked}
                onChange={checkBoxChanged}
                name='phiCheckbox'
                className={styles.checked}
              />
            }
            label='This document does not contain any PHI'
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onComfirmNoPHI}
            disabled={!phiCheckboxChecked}
            variant='contained'
            className={styles.confirmNoPHI}
            style={{ textTransform: 'none' }}
          >
            Confirm No PHI
          </Button>
          <Button
            onClick={discardandClose}
            variant='outlined'
            className={styles.cancel}
            style={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PdfModal
