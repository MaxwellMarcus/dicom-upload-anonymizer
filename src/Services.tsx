import {
  siteWideAnonAPI,
  dateTimeProjectValidationAPI,
  dateTimeSiteValidationAPI,
  csrfAPI,
  availableProjectsAPI,
  visitTemplateProjectKeyAPI,
  visitTemplateSiteKeyAPI,
  actualVisitsAndModalitiesAPI,
} from './constants'
import { fetchParams } from './myTypes'
let csrf = ''
export const getSetCSRF = async (): Promise<void> => {
  const call: fetchParams = requestParams('GET')
  const response = await fetch(`${call.domain}${csrfAPI}`, call.params)
  if (response.status === 200) {
    const responseValue = await response.text()
    const splitResponse = responseValue.split(';')
    csrf = splitResponse[1].trim()
    document.cookie = csrf
  }
}

export const getSiteWideAnonScript = async (): Promise<Response> => {
  await getSetCSRF()
  const call: fetchParams = requestParams('GET')
  return fetch(`${call.domain}${siteWideAnonAPI}`, call.params)
}

export const uploadFiles = (
  projectId: string,
  subjectId: string,
  files: Blob,
  visitCode: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('POST', files)
  return fetch(
    `${call.domain}/data/services/import?inbody=true&prevent_anon=true&import-handler=DICOM-zip&PROJECT_ID=${projectId}&SUBJECT_ID=${subjectId}&VISIT=${visitCode}&${csrf}`,
    call.params,
  )
}

export const getAvailableProjects = (): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(`${call.domain}${availableProjectsAPI}`, call.params)
}

export const getVisitTemplateProjectKey = (
  projectId: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(
    `${call.domain}${visitTemplateProjectKeyAPI(projectId)}`,
    call.params,
  )
}

export const getVisitTemplateSiteKey = (): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(`${call.domain}${visitTemplateSiteKeyAPI}`, call.params)
}

export const getVisitsAndModalities = (visitKey: string): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(
    `${call.domain}${actualVisitsAndModalitiesAPI(visitKey)}`,
    call.params,
  )
}

export const getIsDateTimeProjectValidationRequired = (
  projectId: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(
    `${call.domain}${dateTimeProjectValidationAPI(projectId)}`,
    call.params,
  )
}

export const getIsDateTimeSiteValidationRequired = (): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(`${call.domain}${dateTimeSiteValidationAPI}`, call.params)
}

export const uploadPdf = async (
  pdf: File,
  subjectId: string,
  pdfUrl: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('PUT', pdf)
  await commitDicomFilesUpload(pdfUrl)
  const fileType = pdf.name.substr(pdf.name.indexOf('.'))
  return fetch(
    `${call.domain}${pdfUrl}/resources/${subjectId}/files/${subjectId}${fileType}?inbody=true`,
    call.params,
  )
}

/**
 * intermediary call to say the dicom file upload process is done
 */
const commitDicomFilesUpload = (pdfUrl: string): Promise<Response> => {
  const call: fetchParams = requestParams('POST')
  return fetch(`${call.domain}${pdfUrl}?action=commit`, call.params)
}

/**
 * Handle differences for production vs development
 * @param method - the http request type
 * @param body - optional to pass something to the body of the request
 * @returns a fetchParams object
 */
const requestParams = (method: string, body?: Blob): fetchParams => {
  if (process.env.NODE_ENV === 'development') {
    const username = process.env.REACT_APP_XNAT_USERNAME
    const password = process.env.REACT_APP_XNAT_PASSWORD
    const auth = `Basic ${Buffer.from(`${username}:${password}`).toString(
      'base64',
    )}`
    return {
      domain: process.env.REACT_APP_XNAT_DOMAIN,
      params: {
        method: method,
        withCredentails: true,
        credentials: 'include',
        headers: {
          Authorization: auth,
        },
        body: body,
      },
    }
  } else
    return {
      domain: '',
      params: {
        method: method,
        withCredentails: true,
        credentials: 'include',
        body: body,
      },
    }
}
