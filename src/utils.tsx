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

// function checkDicomFile(arrayBuffer) {
//   if (arrayBuffer.length <= 132) return false
//   const arr = new Uint8Array(arrayBuffer.slice(128, 132))
//   // bytes from 128 to 132 must be "DICM"
//   return Array.from('DICM').every((char, i) => char.charCodeAt(0) === arr[i])
// }

/**
 *
 * @param {File} file - checks whether the uploaded item is a zip folder
 * @returns
 */
export const isZippedFolder = (file: File): boolean => {
  return file.type.includes('zip')
}

/**
 *
 * @param {number} milliseconds - converts milliseconds to minutes
 * @returns
 */
// const msToMinutes = (milliseconds: number) => {
//   return Math.floor(milliseconds / (1000 * 60))
// }

/**
 * CURRENTLY UNUSED - unsure if needed later
 * @param {File} files - the uploaded anonymized files
 * @param {*} dateTime - the date-time user input value
 * @returns {String} The name of the first file outside the 2 houor range
 */
// export const checkTimeDiffs = (files: myFiles, dateTime: number) : string => {
//   for (let i = 0; i < files.length; i++) {
//     const timeDiff = msToMinutes(files[i].lastModified - dateTime)
//     const absTimeDiff = Math.abs(timeDiff)
//     if (absTimeDiff > 120) {
//       return `${files[i].fileName} is ${absTimeDiff} minutes ${
//         timeDiff > 0 ? 'after' : 'before'
//       } the verification time entered`
//     }
//   }
//   return ''
// }

export const checkStudyDateTimeAndUID = (
  files: myFiles,
  dateTime: string,
): dateTimeErrors => {
  const errors: dateTimeErrors = {
    dateTimeError: false,
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
    }

    if (files[0].dicomTags.UID !== initialUID) {
      errors.studyInstanceUidError = true
    }
  }
  return errors
}
