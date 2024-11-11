// import MongoDbClient from "@/lib/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import NextAuth from "next-auth";
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error('Please add your Google Secrets .env');
// }

// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(MongoDbClient),
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//     signOut: "/logout",
//   },
//   // Configuración adicional
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { handlers } from "@/auth"
export const { GET, POST } = handlers
