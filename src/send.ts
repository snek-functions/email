import {fn} from './factory'
import {sendMail} from './internal/email.js'

const send = fn<{email: string; subject: string; msg: string}, void>(
  async ({email, subject, msg}, _, req) => {
    // SMTP_HOST=smtp-relay.snek.at
    // SMTP_PORT=587
    // SMTP_USER=snekman@snek.at
    // SMTP_PASSWORD=xxxxxxxxxxxxxxxxxxxxxx
    // SMTP_SENDER=noreply@snek.at

    const res = await sendMail(
      {
        from: `${(process.env.SMTP_SENDER, process.env.SMTP_USER)}`,
        to: email,
        subject: subject,
        html: msg
      },
      {
        host: `${process.env.SMTP_HOST}`,
        port: `${process.env.SMTP_PORT}`,
        secure: true,
        user: `${process.env.SMTP_USER}`,
        password: `${process.env.SMTP_PASSWORD}`
      }
    )

    console.log(email)
    console.log(msg)
    console.log(res)
  },
  {
    name: 'send'
  }
)

export default send
