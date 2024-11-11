// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import MongoDbClient from "./lib/mongodb";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Please add your Google Secrets .env');
}

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export const authOptions = {
  // adapter: MongoDBAdapter(MongoDbClient),
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   session: async ({ session }) => {
  //     // Logged in users are authenticated, otherwise redirect to login page
  //     return session
  //   },
  // },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)