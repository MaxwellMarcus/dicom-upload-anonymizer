import { FileWithPath } from 'react-dropzone'
import { TWENTY_FIVE_MEGA_BYTES } from './constants'
import { myFiles, dateTimeErrors } from './myTypes'

export const formatFileSize = (size: number): string => {
  if (size === 0) return '0 B'
  const n = Math.floor(Math.log(size) / Math.log(1024))
  return (
    Number((size / Math.pow(1024, n)).toFixed(2)) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][n]
  )
}

export const isDicomfile = (arrayBuffer: ArrayBuffer): boolean => {
  if (arrayBuffer.byteLength <= 132) return false
  const arr = new Uint8Array(arrayBuffer.slice(128, 132))
  // bytes from 128 to 132 must be "DICM"
  return Array.from('DICM').every((char, i) => char.charCodeAt(0) === arr[i])
}

/**
 *
 * @param {File} file - checks whether the uploaded item is a zip folder
 * @returns
 */
export const isZippedFolder = (file: FileWithPath): boolean => {
  return file.type.includes('zip')
}

export const checkStudyDateTimeAndUID = (
  files: myFiles,
  dateTime: string,
): dateTimeErrors => {
  const errors: dateTimeErrors = {
    dateTimeError: false,
    dateTimeErrorFiles: [],
    studyInstanceUidError: false,
  }
  const formattedDateTime = dateTime.replace(/-|T|:/g, '')
  const dateTimeInput = {
    date: formattedDateTime.substring(0, 8),
    hour: formattedDateTime.substring(8, 10),
  }

  const initialUID = files[0].dicomTags.UID

  for (let i = 0; i < files.length; i++) {
    const hourDiff = Math.abs(
      Number(files[i].dicomTags.time.substring(0, 2)) -
        Number(dateTimeInput.hour),
    )

    if (files[i].dicomTags.date !== dateTimeInput.date || hourDiff > 2) {
      errors.dateTimeError = true
      errors.dateTimeErrorFiles.push({ filename: files[i].fileName })
    }

    if (files[0].dicomTags.UID !== initialUID) {
      errors.studyInstanceUidError = true
    }
  }
  return errors
}

export const getFolderName = (path: string): string => {
  const folderName = path.split('/')
  // If directory - name will be index 1
  // If zip - name will be index 0
  return folderName[1] || folderName[0]
}

export const parseUserString = (userString: string): string => {
  if (userString !== '') {
    const parts = userString.split(' ')
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`
  }
  return ''
}

export const numberOfChunks = (files: myFiles): number => {
  let totalUploadSize = 0

  files.forEach((file) => {
    totalUploadSize += file.size
  })

  return Math.ceil(totalUploadSize / TWENTY_FIVE_MEGA_BYTES)
}
