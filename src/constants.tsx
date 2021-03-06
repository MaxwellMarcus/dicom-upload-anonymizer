export const domain =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_XNAT_DOMAIN
    : location.hostname
export const csrfAPI = '/data/JSESSION?CSRF=True'
export const siteWideAnonAPI = '/data/config/anon/script?format=json'
export const availableProjectsAPI = '/xapi/dcauploader/projects'
export const visitTemplateProjectKeyAPI = (projectId: string): string => {
  return `/data/projects/${projectId}/config/cr_protocol/template?contents=true&accept-not-found=true`
}
export const visitTemplateSiteKeyAPI =
  '/data/config/cr_protocol/default?contents=true&accept-not-found=true'
export const actualVisitsAndModalitiesAPI = (visitKey: string): string => {
  return `/data/config/cr_protocol/templates/${visitKey}?contents=true&accept-not-found=true`
}
export const dateTimeSiteValidationAPI =
  '/data/config/applet/require-date?contents=true&accept-not-found=true'
export const dateTimeProjectValidationAPI = (projectId: string): string => {
  return `/data/projects/${projectId}/config/applet/require-date?contents=true&accept-not-found=true`
}
export const projectSessionNamingConventionAPI = (
  projectId: string,
): string => {
  return `/data/projects/${projectId}/config/cr_naming/template?contents=true&accept-not-found=true`
}
export const siteSessionNamingConventionAPI =
  '/data/config/cr_naming/template?contents=true&accept-not-found=true'
export const myProfileLink =
  '/app/template/XDATScreen_UpdateUser.vm#tab=user-profile-tab'
export const logoutUserLink = '/app/action/LogoutUser'
export const STUDY_DATE = '00080020'
export const STUDY_TIME = '00080030'
export const STUDY_INSTANCE_UID = '0020000D'
export const MODALITY = '00080060'

export const LIBRARY_PARSER = {
  ANTLR4: 'ANTLR4',
  PEGJS: 'PEGJS',
}

export const TWENTY_FIVE_MEGA_BYTES = 25000000

export const uploadSteps = [
  'Session Information',
  'Imaging Data',
  'Anonymization',
  'Empty Fourth'
]

export const fullStopErrors = {
  NO_PROJECTS_AVAILABLE: {
    error: true,
    errorTitle: 'Access Denied',
    errorTextLine1: 'You do not have access to any Performance Sites.',
    errorTextLine2: 'Please contact your system administrator.',
  },
  PROJECTS_IRRETRIEVABLE: {
    error: true,
    errorTitle: 'Service Failure',
    errorTextLine1: 'Performance site information cannot be retrived.',
    errorTextLine2: 'Please contact your system administrator.',
  },
  VISITS_AND_MODALITIES_IRRETRIEVABLE: {
    error: true,
    errorTitle: 'Service Failure',
    errorTextLine1: 'Visit and Modality information cannot be retrived.',
    errorTextLine2: 'Please contact your system administrator.',
  },
  ANON_SCRIPT_IRRETRIEVABLE: {
    error: true,
    errorTitle: 'Service Failure',
    errorTextLine1: 'Anonymization service is unavailable.',
    errorTextLine2: 'Please contact your system administrator.',
  },
  DICOM_UPLOAD_FAILED: {
    error: true,
    errorTitle: 'Service Failure',
    errorTextLine1: 'Uploading annonymized DICOM files failed.',
    errorTextLine2: 'Please contact your system administrator.',
  },
  PDF_UPLOAD_FAILED: {
    error: true,
    errorTitle: 'Service Failure',
    errorTextLine1: 'Uploading PDF file failed.',
    errorTextLine2: 'Please contact your system administrator.',
  },
}
