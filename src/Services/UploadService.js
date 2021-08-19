import { baseUrl, importAPI } from '../utils'

// eslint-disable-next-line no-undef
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

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
