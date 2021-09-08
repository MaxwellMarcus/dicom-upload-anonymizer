export const baseUrl = 'https://dakota-dev-20210803-1130.dev.radiologics.com'
export const anonymizeAPI = '/xapi/anonymize/site'
export const dateTimeSiteValidationAPI =
  '/data/config/applet/require-date?contents=true&accept-not-found=true'
export const dateTimeProjectValidationAPI = (projectId: string): string => {
  return `/data/projects/${projectId}/config/applet/require-date?contents=true&accept-not-found=true`
}
export const STUDY_DATE = '00080020'
export const STUDY_TIME = '00080030'
export const STUDY_INSTANCE_UID = '0020000D'

export const LIBRARY_PARSER = {
  ANTLR4: 'ANTLR4',
  PEGJS: 'PEGJS',
}
