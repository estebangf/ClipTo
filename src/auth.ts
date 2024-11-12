import NextAuth from "next-auth"
import authConfig from "./auth.config"
import MongoDbClient from "./lib/mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"


if (!process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const DB_NAME = process.env.DB_NAME

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(MongoDbClient, {
    databaseName: DB_NAME,
  }),
  callbacks: {
    session: ({ session, token }) => {
      console.log('\\\\\\\\\\\\\\   callbacks   \\\\\\\\\\\\\\\\\\')
      console.log(session)
      console.log(token)
      console.log('\\\\\\\\\\\  END callbacks END   \\\\\\\\\\\\\\')

      return ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      })
    },
  },
  ...authConfig,
})