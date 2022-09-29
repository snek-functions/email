import {Email} from './email/2FATemplate.js'
import {fn} from './factory'

const send2fa = fn<
  {
    email: string
    subject: string
    firstName: string
    lastName: string
    link: string
  },
  void
>(
  async ({email, subject, firstName, lastName, link}, _, req) => {
    const {sendMail} = await import('./internal/email.js')

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
        html: Email(link, firstName, lastName)
      },
      {
        host: `${process.env.SMTP_HOST}`,
        port: Number(`${process.env.SMTP_PORT}`),
        secure: true,
        user: `${process.env.SMTP_USER}`,
        password: `${process.env.SMTP_PASSWORD}`
      }
    )

    console.log(email)
    console.log(res)
  },
  {
    name: 'send2fa'
  }
)

export default send2fa
