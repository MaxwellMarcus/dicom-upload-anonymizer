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
  getVisitsAndModalities,
  getVisitTemplateProjectKey,
  getVisitTemplateSiteKey,
  uploadFiles,
  uploadPdf,
} from './Services'
import {
  availableProjectsResponse,
  siteWideAnonResponse,
  user,
  visitProps,
} from './myTypes'
import { fullStopErrors } from './constants'
import PageHeader from './components/PageHeader/PageHeader'
const App: React.FC = () => {
  const [fullStopError, setFullStopError] = useState({
    error: false,
    errorTitle: '',
    errorTextLine1: '',
    errorTextLine2: '',
  })
  const [anonScript, setAnonScript] = useState(`
    version "6.3"
  `)
  const [availableProjects, setAvailableProjects] = useState<Array<string>>([])
  const [userInfo, setUserInfo] = useState<user>({ userString: '', email: '' })

  useEffect(() => {
    // getSiteWideAnonScript().then((response: Response) => {
    //   if (response.status === 200) {
    //     response.json().then((response: siteWideAnonResponse) => {
    //       if (response.ResultSet.Result[0].status === 'enabled') {
    //         setAnonScript(response.ResultSet.Result[0].contents)
    //       }
    //     })
    //   } else {
    //     setFullStopError(fullStopErrors.ANON_SCRIPT_IRRETRIEVABLE)
    //   }
    // })
    setAvailableProjects(["Test 1", "Test 2", "Test 3"]);
    // getAvailableProjects().then((response: Response) => {
    //   if (response.status === 200) {
    //     response.json().then((response: availableProjectsResponse) => {
    //       if (response.length === 0) {
    //         setFullStopError(fullStopErrors.NO_PROJECTS_AVAILABLE)
    //       } else {
    //         setUserInfo({
    //           userString: response[0].userString,
    //           email: response[0].email,
    //         })
    //         response.forEach((project) => {
    //           setAvailableProjects((current) => [...current, project.projectId])
    //         })
    //       }
    //     })
    //   } else {
    //     setFullStopError(fullStopErrors.PROJECTS_IRRETRIEVABLE)
    //   }
    // })
  }, [])

  const retrieveVisitsAndModalities = async (
    projectId: string,
  ): Promise<Response> => {
    let responseValue = null
    let key = ''
    const projResponse = await getVisitTemplateProjectKey(projectId)
    if (projResponse.status === 200) {
      responseValue = await projResponse.json()
      if (responseValue.key === 'DEFAULT' && responseValue.name === 'DEFAULT') {
        key = await _getVisitTemplateSiteKey()
      } else if (responseValue.key !== '' && responseValue.name !== 'NONE') {
        return projResponse
      } else {
        key = responseValue.key
      }
    } else {
      key = await _getVisitTemplateSiteKey()
    }
    const visitsAndModalitiesResponse = await getVisitsAndModalities(key)
    if (visitsAndModalitiesResponse.status !== 200) {
      setFullStopError(fullStopErrors.VISITS_AND_MODALITIES_IRRETRIEVABLE)
    }
    return visitsAndModalitiesResponse
  }

  const _getVisitTemplateSiteKey = async (): Promise<string> => {
    const siteResponse = await getVisitTemplateSiteKey()
    if (siteResponse.status === 200) {
      const responseValue = await siteResponse.json()
      return responseValue.key
    }
  }

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
    visit: visitProps,
    session: string,
  ): Promise<Response> => {
    const uploadFilesResponse = await uploadFiles(
      projectId,
      subjectId,
      zippedFolder,
      visit,
      session,
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
          <PageHeader userInfo={userInfo} />
        </Box>
      </Paper>
      <Box className={styles.greyBackground} py={2}>
        <Container maxWidth='md'>
            <Upload
              anonScript={anonScript}
              checkIfDateTimeRequired={checkIfDateTimeRequired}
              availableProjects={availableProjects}
              handleUploadFiles={handleUploadFiles}
              handleUploadPdf={handleUploadPdf}
              retrieveVisitsAndModalities={retrieveVisitsAndModalities}
            />
        </Container>
      </Box>
    </div>
  )
}
// {!fullStopError.error && (
  // )}
  // {fullStopError.error && (
    //   <div className={styles.errorContainer}>
    //     <div className={styles.error}>
    //       <h1 className={styles.errorTitle}>
    //         {fullStopError.errorTitle}
    //       </h1>
    //       <p className={styles.errorText}>
    //         {fullStopError.errorTextLine1}
    //       </p>
    //       <p className={styles.errorText}>
    //         {fullStopError.errorTextLine2}
    //       </p>
    //     </div>
    //   </div>
    // )}

export default App
