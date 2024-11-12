import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Please add your Google Secrets .env');
}

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export default {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig