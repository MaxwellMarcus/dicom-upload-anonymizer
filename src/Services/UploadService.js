import { proxySingleFileUploadURL, singleFileUploadURL } from '../utils'

async function UploadService(file) {
  const postData = async (url = '', file = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      body: file,
    })
      .then((result) => {
        return result.json()
      })
      .catch((error) => {
        return error
      })
    return response
  }

  return postData(proxySingleFileUploadURL, file)
}

export default UploadService
