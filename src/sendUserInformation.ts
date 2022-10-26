import {Email} from './email/UserInformationTemplate.js'
import {fn} from './factory'

const sendUserInformation = fn<
  {
    email: string
    subject: string
    firstName: string
    lastName: string
    userDataString: string
    experimentsDataString: string
    additionalDataString: string
  },
  void
>(
  async (args, _, {req, res}) => {
    const {sendMail} = await import('./internal/email.js')

    // SMTP_HOST=smtp-relay.snek.at
    // SMTP_PORT=587
    // SMTP_USER=snekman@snek.at
    // SMTP_PASSWORD=xxxxxxxxxxxxxxxxxxxxxx
    // SMTP_SENDER=noreply@snek.at

    const ress = await sendMail(
      {
        from: `${(process.env.SMTP_SENDER, process.env.SMTP_USER)}`,
        to: args.email,
        subject: args.subject,
        html: Email(
          args.firstName,
          args.lastName,
          args.userDataString,
          args.experimentsDataString,
          args.additionalDataString
        )
      },
      {
        host: `${process.env.SMTP_HOST}`,
        port: Number(`${process.env.SMTP_PORT}`),
        secure: true,
        user: `${process.env.SMTP_USER}`,
        password: `${process.env.SMTP_PASSWORD}`
      }
    )
  },
  {
    name: 'sendUserInformation'
  }
)

export default sendUserInformation
