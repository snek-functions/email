import {defineService} from '@snek-at/function'
import {sendMail} from './internal/email'

// export const generateModelId: Prisma.Prisma.Middleware = async (
//   params: Prisma.Prisma.MiddlewareParams,
//   next
// ) => {
//   if (params.action === 'create') {
//     switch (params.model) {
//       case 'User':
//         const uuid = uuidv4()
//         params.args.data.id = uuid
//         const user = prisma.user.findMany()
//         console.log(user)

//         break

//       // ...
//     }
//   }

//   return await next(params)
// }

// prisma.$use(generateModelId)

// user
// users
// username
// usernames
// account
// accounts
// resource
// resources
// email
// emails
// alias
// aliases
// snekId
// snekIds
// genericObject
// genericObjects

// user
// userCreate
// userUpdate
// userDelete
// users
// account
// accounts
// authenticationPublish
// aliasCheck
// aliasAdd
// aliasDelete

export default defineService(
  {
    Query: {
      //userAuthenticate: Login.authenticate
    },
    Mutation: {
      //   resourceCreate: async (name: string) => {
      //     const resource = await prisma.resource.create({
      //       data: {
      //         name: name
      //       }
      //     })

      //     return resource
      //   },
      //snekIdCreate: (snekId: SnekId) => new SnekId(snekId,).create,
      //userAuthenticate: Login.authenticate

      send: async (
        envelope: {
          from: string
          to: string[]
          cc?: string[]
          bcc?: string[]
        },
        subject: string,
        message: string,
        config: {
          host: string
          port: number
          secure: boolean
          user: string
          password: string
        }
      ): Promise<boolean> =>
        sendMail(
          {
            from: envelope.from,
            to: envelope.to,
            cc: envelope.cc,
            bcc: envelope.bcc,
            subject: subject,
            html: message
          },
          {
            host: config.host,
            port: config.port,
            secure: config.secure,
            user: config.user,
            password: config.password
          }
        )
    }
  },
  {
    configureApp: app => {
      app.get('/hello', (req, res) => {
        res.send('Hello world!!')
      })

      app.get('/hello/:name', (req, res) => {
        res.send('Hello ' + req.params.name)
      })

      return app
    }
  }
)
