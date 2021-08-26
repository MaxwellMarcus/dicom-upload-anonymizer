import { baseUrl, anonymizeAPI } from './utils'

// eslint-disable-next-line no-undef
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

/**
 *
 * @param {string} projectId - the projectId to associate with these images
 * @param {string} subjectId - the subjectId to associate with these images
 * @param {Blob} files
 */
export const uploadFiles = (projectId = '', subjectId = '', files = {}) => {
  try {
    fetch(
      `${baseUrl}/data/services/import?inbody=true&prevent_anon=true&import-handler=DICOM-zip&PROJECT_ID=${projectId}&SUBJECT_ID=${subjectId}`,
      {
        method: 'POST',
        withCredentails: true,
        credentials: 'include',
        headers: {
          Authorization: auth,
        },
        body: files,
      },
    )
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @returns the site-wide anonymization script
 */
export const getSiteWideAnonScript = () => {
  try {
    return fetch(`${baseUrl}${anonymizeAPI}`, {
      method: 'GET',
      withCredentails: true,
      credentials: 'include',
      headers: {
        Authorization: auth,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
