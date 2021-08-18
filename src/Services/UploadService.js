import { baseUrl, singleFileUploadURL } from '../utils'

// eslint-disable-next-line no-undef
const auth = 'Basic ' + Buffer.from('admin:admin').toString('base64')

export const singleFileUpload = async (file = {}) => {
  try {
    fetch(`${baseUrl}${singleFileUploadURL}`, {
      method: 'POST',
      withCredentails: true,
      credentials: 'include',
      headers: {
        Authorization: auth,
      },
      dest: '/prearchive',
      body: file,
    })
  } catch (error) {
    console.log(error)
  }
}
