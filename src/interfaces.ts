export interface MailOptions {
  from?: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text?: string
  html: string
}
export interface SMTPOptions {
  host: string
  port: number
  secure: boolean
  user: string
  password: string
}
