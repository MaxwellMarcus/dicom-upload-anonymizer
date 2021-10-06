import { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Upload from './components/Upload/Upload'
import styles from './App.module.css'
import {
  getAvailableProjects,
  getIsDateTimeProjectValidationRequired,
  getIsDateTimeSiteValidationRequired,
  getSiteWideAnonScript,
  uploadFiles,
  uploadPdf,
} from './Services'
import { availableProjectsResponse, siteWideAnonResponse } from './myTypes'
import { fullStopErrors } from './constants'
const App: React.FC = () => {
  const [fullStopError, setFullStopError] = useState({
    error: false,
    errorTitle: '',
    errorTextLine1: '',
    errorTextLine2: '',
  })
  const [anonScript, setAnonScript] = useState('')
  const [availableProjects, setAvailableProjects] = useState<Array<string>>([])

  useEffect(() => {
    getSiteWideAnonScript().then((response: Response) => {
      if (response.status === 200) {
        response.json().then((response: siteWideAnonResponse) => {
          if (response.ResultSet.Result[0].status === 'enabled') {
            setAnonScript(response.ResultSet.Result[0].contents)
          }
        })
      } else {
        setFullStopError(fullStopErrors.ANON_SCRIPT_IRRETRIEVABLE)
      }
    })
    getAvailableProjects().then((response: Response) => {
      if (response.status === 200) {
        response.json().then((response: availableProjectsResponse) => {
          if (response.length === 0) {
            setFullStopError(fullStopErrors.NO_PROJECTS_AVAILABLE)
          } else {
            response.forEach((project) => {
              setAvailableProjects([...availableProjects, project.projectId])
            })
          }
        })
      } else {
        setFullStopError(fullStopErrors.PROJECTS_IRRETRIEVABLE)
      }
    })
  }, [])

  const checkIfDateTimeRequired = async (value: string): Promise<boolean> => {
    let responseValue
    const projResponse = await getIsDateTimeProjectValidationRequired(value)
    if (projResponse.status === 200) {
      responseValue = await projResponse.json()
      return responseValue
    } else if (projResponse.status === 204) {
      return await checkIsDateTimeSiteValidationRequired()
    } else {
      return true
    }
  }

  const checkIsDateTimeSiteValidationRequired = async (): Promise<boolean> => {
    const siteResponse = await getIsDateTimeSiteValidationRequired()
    if (siteResponse.status === 200) {
      const responseValue = await siteResponse.json()
      return responseValue
    } else if (siteResponse.status === 204) {
      return false
    } else {
      return true
    }
  }

  const handleUploadFiles = async (
    projectId: string,
    subjectId: string,
    zippedFolder: Blob,
  ): Promise<Response> => {
    const uploadFilesResponse = await uploadFiles(
      projectId,
      subjectId,
      zippedFolder,
    )
    if (uploadFilesResponse.status !== 200) {
      setFullStopError(fullStopErrors.DICOM_UPLOAD_FAILED)
    }
    return uploadFilesResponse
  }

  const handleUploadPdf = async (
    pdfFile: File,
    subjectId: string,
    url: string,
  ): Promise<Response> => {
    const uploadPdfResponse = await uploadPdf(pdfFile, subjectId, url)
    if (uploadPdfResponse.status !== 200) {
      setFullStopError(fullStopErrors.PDF_UPLOAD_FAILED)
    }
    return uploadPdfResponse
  }

  return (
    <div className='App'>
      <Paper elevation={0} square>
        <Box px={2} marginTop={0}>
          <h3 className={styles.title}>Subject Data Upload</h3>
        </Box>
      </Paper>
      <Box className={styles.greyBackground} py={2}>
        <Container maxWidth='md'>
          {!fullStopError.error && (
            <Upload
              anonScript={anonScript}
              checkIfDateTimeRequired={checkIfDateTimeRequired}
              availableProjects={availableProjects}
              handleUploadFiles={handleUploadFiles}
              handleUploadPdf={handleUploadPdf}
            />
          )}
          {fullStopError.error && (
            <div className={styles.errorContainer}>
              <div className={styles.error}>
                <h1 className={styles.errorTitle}>
                  {fullStopError.errorTitle}
                </h1>
                <p className={styles.errorText}>
                  {fullStopError.errorTextLine1}
                </p>
                <p className={styles.errorText}>
                  {fullStopError.errorTextLine2}
                </p>
              </div>
            </div>
          )}
        </Container>
      </Box>
    </div>
  )
}

export default App
