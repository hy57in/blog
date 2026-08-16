export const resumeDownloadPath = '/about/resume.pdf'
export const resumePdfFileName = '김효진_Frontend_Resume.pdf'
export const resumePdfFallbackFileName = 'Hyojin_Kim_Frontend_Resume.pdf'

export function isResumeDownloadEnabled(environment: string | undefined) {
  return environment === 'development'
}
