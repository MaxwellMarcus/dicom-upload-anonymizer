import React, { useState } from 'react'
import {
  dateTimeProps,
  emptyModality,
  emptyVisit,
  SessionInformationProps,
} from '../../myTypes'
import styles from './SessionInformation.module.css'
import PdfModal from '../PdfModal/PdfModal'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Dropzone from 'react-dropzone'
import DescriptionOutlined from '@material-ui/icons/DescriptionOutlined'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import MenuSelection from '../MenuSelection/MenuSelection'
import { formatDateTime } from '../../utils'

const SessionInformation: React.FC<SessionInformationProps> = ({
  projectId,
  subjectId,
  dateTime,
  availableProjects,
  onProjectChange,
  setSubjectId,
  setDateTime,
  showVisitsAndModalities,
  availableVisitsAndModalities,
  setVisit,
  selectedVisit,
  setModality,
  selectedModality,
  pdfFile,
  onPdfUpload,
  onPdfDiscard,
  isDateTimeInputRequired,
  pdfModalOpen,
  setPdfModalOpen,
}: SessionInformationProps) => {
  const [subjectLeftEmpty, setSubjectLeftEmpty] = useState(false)
  const [dateTimeInvalid, setDateTimeInvalid] = useState(false)

  const handleProjectChange = (value: string) => {
    if (value !== '') {
      setModality(emptyModality)
      setVisit(emptyVisit)
      onProjectChange(value)
    }
  }

  const onSubjectBlur = (value: string) => {
    if (value === '') {
      setSubjectLeftEmpty(true)
    } else {
      setSubjectLeftEmpty(false)
    }
  }

  const handleDateTimeChange = (value: string) => {
    if (value !== '') {
      const dateTime: dateTimeProps = formatDateTime(value)
      setDateTime(dateTime)
    }
  }

  const handleVisitChange = (value: string) => {
    if (value !== '') {
      setModality(emptyModality)
      const selectedVisit = availableVisitsAndModalities.find(
        (visit) => visit.name === value,
      )
      setVisit(selectedVisit)
    }
  }

  const handleModalityChange = (value: string) => {
    if (value !== '') {
      const selectedModality = selectedVisit.modalities.find(
        (modality) => modality.display === value,
      )
      setModality(selectedModality)
    }
  }

  const onDatetimeBlur = (value: string) => {
    if (value === '') {
      setDateTimeInvalid(true)
    } else {
      setDateTimeInvalid(false)
    }
  }

  const handlePdfClose = () => {
    setPdfModalOpen(false)
  }

  const handleFileSelection = (droppedFile: Array<File>) => {
    const file = droppedFile[0]
    if (file && file.type && file.type.includes('pdf')) {
      onPdfUpload(file)
    }
  }

  const helpTooltip = (labelText: string, toolTipText: string) => {
    return (
      <>
        {labelText + ' '}
        {<span className={styles.required}> *</span>}
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

  const errorText = (text: string) => {
    return (
      <p className={styles.error}>
        <ErrorOutlineOutlinedIcon className={styles.errorIcon} />
        {text}
      </p>
    )
  }
  return (
    <>
      <form
        className={`${styles.inputPadding} ${styles.stepperStep}`}
        noValidate
        autoComplete='off'
      >
        <MenuSelection
          label={helpTooltip(
            'Performance Site ID',
            'Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##',
          )}
          field='project'
          value={projectId}
          menuOptions={availableProjects}
          emptyOptionText='Select Performance Site'
          handleOnChange={handleProjectChange}
        />

        <Grid container>
          <Grid item xs={5}>
            <TextField
              onChange={(event) => setSubjectId(event.target.value)}
              onBlur={(event) => onSubjectBlur(event.target.value)}
              id='subject'
              value={subjectId}
              error={subjectLeftEmpty}
              label={helpTooltip(
                'Subject ID',
                'Enter the Subject ID as noted on the metadata form',
              )}
              variant='outlined'
              size='small'
              fullWidth={true}
              className={styles.boldInputLabel}
              InputLabelProps={{
                shrink: true,
                style: { pointerEvents: 'auto' },
              }}
            />
            {subjectLeftEmpty && errorText('Subject ID is required')}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <TextField
              id='datetime-local'
              value={dateTime.rawinputValue}
              label={helpTooltip(
                'Imaging Session Date and Time',
                'Enter the date and time as noted in the DICOM for study verification',
              )}
              type='datetime-local'
              variant='outlined'
              size='small'
              fullWidth={true}
              className={styles.boldDatetimeLabel}
              InputLabelProps={{
                shrink: true,
                style: { pointerEvents: 'auto' },
              }}
              onChange={(event) => handleDateTimeChange(event.target.value)}
              onBlur={(event) => onDatetimeBlur(event.target.value)}
              error={dateTimeInvalid}
              disabled={!isDateTimeInputRequired}
            />
            {dateTimeInvalid &&
              errorText('Imaging Session Date and Time is required')}
          </Grid>
        </Grid>

        {showVisitsAndModalities && (
          <>
            <MenuSelection
              label={
                <>
                  {`Imaging Session Visit `}{' '}
                  <span className={styles.required}> *</span>
                </>
              }
              field='visit'
              value={selectedVisit.name}
              menuOptions={availableVisitsAndModalities.map(
                (visit) => visit.name,
              )}
              emptyOptionText='Select Visit'
              handleOnChange={handleVisitChange}
            />

            <MenuSelection
              label={
                <>
                  {`Modality `} <span className={styles.required}> *</span>
                </>
              }
              field='modality'
              value={selectedModality.display}
              menuOptions={selectedVisit.modalities.map(
                (modality) => modality.display,
              )}
              emptyOptionText='Select Modality'
              handleOnChange={handleModalityChange}
            />
          </>
        )}

        <Grid container>
          <Grid item xs={5}>
            <label className={styles.dropzoneLabel}>
              Metadata Form
              <span className={styles.required}> *</span>
            </label>

            {pdfFile && (
              <div className={styles.pdfInfo}>
                <DescriptionOutlined className={styles.themeBlue} />
                <span className={styles.pdfFileName}>{pdfFile.name}</span>
                <Button
                  className={styles.pdfDiscardButton}
                  variant='outlined'
                  style={{ textTransform: 'none' }}
                  onClick={() => onPdfDiscard()}
                >
                  Discard
                </Button>
              </div>
            )}

            {!pdfFile && (
              <>
                <Dropzone
                  accept='.pdf'
                  maxFiles={1}
                  onDrop={(droppedFile) => handleFileSelection(droppedFile)}
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

      <PdfModal
        pdfModalOpen={pdfModalOpen}
        handlePdfClose={handlePdfClose}
        pdfFile={pdfFile}
        onPdfDiscard={onPdfDiscard}
      />
    </>
  )
}

export default SessionInformation
