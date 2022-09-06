import nodemailer from 'nodemailer'
import {MailOptions, SMTPOptions} from '../interfaces'

// CREATE CONNECTION
async function createConnection({
  host,
  port,
  secure,
  user,
  password
}: SMTPOptions) {
  return new Promise<nodemailer.createTransport>((resolve, reject) => {
    resolve(
      nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure,
        auth: {
          user: user,
          pass: password
        }
      })
    )
  })
}

// SEND MAIL
export async function sendMail(options: MailOptions, smtp?: SMTPOptions) {
  const con = await createConnection(smtp)
  const mail = await con.sendMail({
    from: options.from,
    to: options.to,
    cc: options.cc,
    bcc: options.bcc,
    subject: options.subject,
    text: options.text,
    html: options.html
  })

  return mail.response
}
