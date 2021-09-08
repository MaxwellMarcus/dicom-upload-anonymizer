import {
  baseUrl,
  anonymizeAPI,
  dateTimeProjectValidationAPI,
  dateTimeSiteValidationAPI,
} from './constants'
import { fetchParams } from './myTypes'
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

/**
 *
 * @param {string} projectId - the projectId to associate with these images
 * @param {string} subjectId - the subjectId to associate with these images
 * @param {Blob} files
 */
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

/**
 *
 * @returns the site-wide anonymization script
 */
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

export const getIsDateTimeProjectValidationRequired = async (
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

  return await fetch(
    `${baseUrl}${dateTimeProjectValidationAPI(projectId)}`,
    params,
  )
}

export const getIsDateTimeSiteValidationRequired =
  async (): Promise<Response> => {
    const params: fetchParams = {
      method: 'GET',
      withCredentails: true,
      credentials: 'include',
      headers: {
        Authorization: auth,
      },
    }

    return await fetch(`${baseUrl}${dateTimeSiteValidationAPI}`, params)
  }
