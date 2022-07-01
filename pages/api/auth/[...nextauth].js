import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "creds",
      async authorize(credentials, req) {
        const user = prisma.user.findMany({
          where: {
            AND: [
              { name: credentials.username },
              { password: credentials.password }
            ]
          }
        })
        if (user) {
          console.log(user)
          return user
        }
        else consle.log("no User")
      }

    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

  ],
  secret: process.env.SECRET,
})