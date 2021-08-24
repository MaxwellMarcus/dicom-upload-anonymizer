export const baseUrl = 'https://dakota-dev-20210803-1130.dev.radiologics.com'

export const importAPI =
  '/data/services/import?inbody=true&import-handler=DICOM-zip'

export const anonymizeAPI = '/xapi/anonymize/site'

export function formatFileSize(size) {
  if (size === 0) return '0 B'
  const n = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, n)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][n]
  )
}

/* eslint-disable */
export function checkDicomFile(arrayBuffer) {
  if (arrayBuffer.length <= 132) return false
  const arr = new Uint8Array(arrayBuffer.slice(128, 132))
  // bytes from 128 to 132 must be "DICM"
  return Array.from('DICM').every((char, i) => char.charCodeAt(0) === arr[i])
}

export const isZippedFolder = (file) => {
  return file.type.includes('zip')
}
