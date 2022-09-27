import {fn} from './factory'

// Sweet snippet for future: https://medium.com/@chiragmehta900/how-to-send-mail-in-node-js-with-nodemailer-in-typescript-889cc46d1437

const send = fn<{email: string; subject: string; msg: string}, void>(
  async ({email, subject, msg}, _, req) => {
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
        html: msg
      },
      {
        host: `${process.env.SMTP_HOST}`,
        port: Number(`${process.env.SMTP_PORT}`) || 0,
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
