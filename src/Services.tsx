import {
  siteWideAnonAPI,
  dateTimeProjectValidationAPI,
  dateTimeSiteValidationAPI,
  csrfAPI,
  availableProjectsAPI,
  visitTemplateProjectKeyAPI,
  visitTemplateSiteKeyAPI,
  actualVisitsAndModalitiesAPI,
  projectSessionNamingConventionAPI,
  siteSessionNamingConventionAPI,
} from './constants'
import {
  dateTimeProps,
  fetchParams,
  modalityProps,
  namingConventionProps,
  visitProps,
} from './myTypes'
import { computeSessionLabel } from './utils'
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

export const uploadFiles = async (
  projectId: string,
  subjectId: string,
  dateTime: dateTimeProps,
  files: Blob,
  visit: visitProps,
  modality: modalityProps,
): Promise<Response> => {
  const sessionNamingConvention = await retrieveSessionNamingConvention(
    projectId,
    visit.key,
  )
  const sessionLabel = `EXPT_LABEL=${computeSessionLabel(
    sessionNamingConvention,
    projectId,
    subjectId,
    dateTime,
    visit,
    modality,
  )}`
  const call: fetchParams = requestParams('POST', files)
  return fetch(
    `${call.domain}/data/services/import?inbody=true&prevent_anon=true&import-handler=DICOM-zip&PROJECT_ID=${projectId}&SUBJECT_ID=${subjectId}&VISIT=${visit.code}&${sessionLabel}&${csrf}`,
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

export const getProjectSessionNamingConvention = (
  projectId: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(
    `${call.domain}${projectSessionNamingConventionAPI(projectId)}`,
    call.params,
  )
}

export const getSiteSessionNamingConvention = (): Promise<Response> => {
  const call: fetchParams = requestParams('GET')
  return fetch(`${call.domain}${siteSessionNamingConventionAPI}`, call.params)
}

const retrieveSessionNamingConvention = async (
  projectId: string,
  selectedVisitKey: string,
): Promise<string> => {
  let responseValue: namingConventionProps = { pattern: '' }
  const projectResponse = await getProjectSessionNamingConvention(projectId)
  if (projectResponse.status === 200) {
    responseValue = await projectResponse.json()
  } else {
    const siteResponse = await getSiteSessionNamingConvention()
    if (siteResponse.status === 200) {
      responseValue = await siteResponse.json()
    }
  }
  if (responseValue.pattern) {
    return responseValue.pattern
  } else {
    if (selectedVisitKey) {
      return '{SUBJECT_LABEL}_{VISIT}_{MOD}'
    } else {
      return '{SUBJECT_LABEL}_{SESSION_DATE}'
    }
  }
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
