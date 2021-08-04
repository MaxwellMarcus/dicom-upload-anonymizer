export const singleFileUploadURL =
  'https://dakota-dev-20210803-1130.dev.radiologics.com/data/services/import?import-handler=gradual-DICOM&PROJECT_ID=test&SUBJECT_ID=sub1'
export const proxySingleFileUploadURL =
  'http://localhost:8010/proxy/data/services/import?import-handler=gradual-DICOM&PROJECT_ID=test&SUBJECT_ID=sub1'

export const script = `
    version "6.3"
    (0008,0080) := "PROJECT PLACEHOLDER"
    (0010,0010) := "SUBJECT PLACEHOLDER"
    (0010,0020) := format["{0}-{1}", (0008,0020), (0008,0030)]
    (0012,0063) := "DIAN common deidentification v001"
    `

//     // Common DIAN anonymization script 10Dec2012
// // by Kevin Archie, karchie@npg.wustl.edu, Jenny Gurney gurneyj@wustl.edu
// - (0008,0050)				// Accession Number
// (0008,0080) := "PROJECT PLACEHOLDER"
// - (0010,0021)				// Issuer of Patient ID
// - (0010,0030)				// Patient's Birth Date
// - (0010,0032)				// Patient's Birth Time
// - (0010,0050)				// Patient's Insurance Plan Code SQ
// - (0010,0101)				// Patient's Primary Language Code SQ
// - (0010,1000)				// Other Patient IDs
// - (0010,1001)				// Other Patient Names
// - (0010,1002)				// Other Patient IDs SQ
// - (0010,1005)				// Patient's Birth Name
// - (0010,1010)				// Patient's Age
// - (0010,1040)				// Patient's Address
// - (0010,1060)				// Patient's Mother's Birth Name
// - (0010,1080)				// Military Rank
// - (0010,1081)				// Branch of Service
// - (0010,1090)				// Medical Record Locator
// - (0010,2000)				// Medical Alerts
// - (0010,2110)				// Allergies
// - (0010,2150)				// Country of Residence
// - (0010,2152)				// Region of Residence
// - (0010,2154)				// Patient's Telephone Numbers
// - (0010,2160)				// Ethnic Group
// - (0010,2180)				// Occupation
// - (0010,21A0)				// Smoking Status
// - (0010,21B0)				// Additional Patient History
// - (0010,21C0)				// Pregnancy Status
// - (0010,21D0)				// Last Menstrual Date
// - (0010,21F0)				// Patient's Religious Preference
// - (0010,2203)				// Patient's Sex Neutered
// - (0010,2297)				// Responsible Person
// - (0010,2298)				// Responsible Person Role
// - (0010,2299)				// Responsible Organization
// (0012,0063) := "DIAN common deidentification v001"
// - (0031,1020)				// Philips Private Tag
// - (0033,1002)				// Philips Private Tag
// - (0033,1013)				// Philips Private Tag
// - (0038,0500)				// Patient State
// - (0038,0100)				// Pertinent Documents SQ
// - (0040,1400)                    	// Requested Procedure Comments
// - (0400,0561)                          // OriginalAttributesSequence
// - (7053,1000)                    	// Philips Private Tag
// - (7053,1001)                    	// Philips Private Tag
// - (7053,1002)                    	// Philips Private Tag
// - (7053,1003)                    	// Philips Private Tag
// // Set XNAT identifying fields
// (0008,1030) := "PROJECT PLACEHOLDER"
// (0010,0010) := "SUBJECT PLACEHOLDER"
// (0010,0020) := format["{0}-{1}", (0008,0020), (0008,0030)]

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
