export const baseUrl = 'https://dakota-dev-20210803-1130.dev.radiologics.com'

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
export const isZippedFolder = (file) => {
  return file.type.includes('zip')
}

/**
 *
 * @param {number} milliseconds - converts milliseconds to minutes
 * @returns
 */
const msToMinutes = (milliseconds) => {
  return Math.floor(milliseconds / (1000 * 60))
}

/**
 * CURRENTLY UNUSED - unsure if needed later
 * @param {File} files - the uploaded anonymized files
 * @param {*} dateTime - the date-time user input value
 * @returns {String} The name of the first file outside the 2 houor range
 */
export const checkTimeDiffs = (files, dateTime) => {
  for (let i = 0; i < files.length; i++) {
    const timeDiff = msToMinutes(files[i].lastModified - dateTime)
    const absTimeDiff = Math.abs(timeDiff)
    if (absTimeDiff > 120) {
      return `${files[i].fileName} is ${absTimeDiff} minutes ${
        timeDiff > 0 ? 'after' : 'before'
      } the verification time entered`
    }
  }
  return ''
}

export const checkStudyDateTimeAndUID = (files, dateTime) => {
  let errors = {
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
      files[i].dicomTags.time.substring(0, 2) - dateTimeInput.hour,
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

export const LIBRARY_PARSER = {
  ANTLR4: 'ANTLR4',
  PEGJS: 'PEGJS',
}
export const STUDY_DATE = '00080020'
export const STUDY_TIME = '00080030'
export const STUDY_INSTANCE_UID = '0020000D'
