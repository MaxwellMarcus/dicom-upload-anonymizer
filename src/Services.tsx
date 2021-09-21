import {
  siteWideAnonAPI,
  dateTimeProjectValidationAPI,
  dateTimeSiteValidationAPI,
  csrfAPI,
} from './constants'
import { fetchParams, pdfFile } from './myTypes'

export const getSetCSRF = async (): Promise<void> => {
  const call: fetchParams = requestParams('GET')
  const response = await fetch(`${call.domain}${csrfAPI}`, call.params)
  if (response.ok) {
    const responseValue = await response.text()
    const splitResponse = responseValue.split(';')
    const csrf = splitResponse[1].trim()
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
): Promise<Response> => {
  const call: fetchParams = requestParams('POST', files)
  return fetch(
    `${call.domain}/data/services/import?inbody=true&prevent_anon=true&import-handler=DICOM-zip&PROJECT_ID=${projectId}&SUBJECT_ID=${subjectId}`,
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
  pdf: pdfFile,
  pdfUrl: string,
): Promise<Response> => {
  const call: fetchParams = requestParams('PUT', pdf.file)
  const response = await commitZipUpload(pdfUrl)
  if (response.ok) {
    const fileType = pdf.file.name.substr(pdf.file.name.indexOf('.'))
    return fetch(
      `${call.domain}${pdfUrl}/resources/${pdf.fileName}/files/${pdf.fileName}${fileType}?inbody=true`,
      call.params,
    )
  }
}

/**
 * intermediary call to say the dicom file upload process is done
 */
const commitZipUpload = (pdfUrl: string): Promise<Response> => {
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
