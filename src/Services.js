import { baseUrl, importAPI, anonymizeAPI } from './utils'

// eslint-disable-next-line no-undef
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

/**
 *
 * @param {blob} files - the zipped files
 */
export const uploadFiles = (files = {}) => {
  try {
    fetch(`${baseUrl}${importAPI}`, {
      method: 'POST',
      withCredentails: true,
      credentials: 'include',
      headers: {
        Authorization: auth,
      },
      dest: '/prearchive',
      body: files,
    })
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
