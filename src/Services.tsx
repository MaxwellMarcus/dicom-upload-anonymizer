import {
  baseUrl,
  anonymizeAPI,
  dateTimeProjectValidationAPI,
  dateTimeSiteValidationAPI,
} from './constants'
import { fetchParams, pdfFile } from './myTypes'
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

export const uploadFiles = (
  projectId: string,
  subjectId: string,
  files: Blob,
): Promise<Response> => {
  const params: fetchParams = {
    method: 'POST',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
    body: files,
  }
  return fetch(
    `${baseUrl}/data/services/import?inbody=true&prevent_anon=true&import-handler=DICOM-zip&PROJECT_ID=${projectId}&SUBJECT_ID=${subjectId}`,
    params,
  )
}

export const getSiteWideAnonScript = (): Promise<Response> => {
  const params: fetchParams = {
    method: 'GET',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
  }
  return fetch(`${baseUrl}${anonymizeAPI}`, params)
}

export const getIsDateTimeProjectValidationRequired = (
  projectId: string,
): Promise<Response> => {
  const params: fetchParams = {
    method: 'GET',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
  }

  return fetch(`${baseUrl}${dateTimeProjectValidationAPI(projectId)}`, params)
}

export const getIsDateTimeSiteValidationRequired = (): Promise<Response> => {
  const params: fetchParams = {
    method: 'GET',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
  }

  return fetch(`${baseUrl}${dateTimeSiteValidationAPI}`, params)
}

export const uploadPdf = async (
  pdf: pdfFile,
  pdfUrl: string,
): Promise<Response> => {
  const params: fetchParams = {
    method: 'PUT',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
    body: pdf.file,
  }
  const response = await commitZipUpload(pdfUrl)
  if (response.ok) {
    const fileType = pdf.file.name.substr(pdf.file.name.indexOf('.'))
    return fetch(
      `${baseUrl}${pdfUrl}/resources/${pdf.fileName}/files/${pdf.fileName}${fileType}?inbody=true`,
      params,
    )
  }
}

/**
 * intermediary call to say the dicom file upload process is done
 */
const commitZipUpload = (pdfUrl: string): Promise<Response> => {
  const params: fetchParams = {
    method: 'POST',
    withCredentails: true,
    credentials: 'include',
    headers: {
      Authorization: auth,
    },
  }
  return fetch(`${baseUrl}${pdfUrl}?action=commit`, params)
}
