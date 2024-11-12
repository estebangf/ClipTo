import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware (req: NextRequest) {
  // Your custom middleware logic goes here
  // if (!req.auth && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/") {
  //   const newUrl = new URL('/login', req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }

  // if (req.auth && req.nextUrl.pathname === "/login") {
  //   const newUrl = new URL("/dashboard", req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }

  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    // secret: process.env.NEXTAUTH_SECRET,
    // secret: process.env.AUTH_SECRET,
  });
  // const session = req.cookies.get("next-auth.session-token")

  console.log('\\\\\\\\\\\\\\   NextRequest   \\\\\\\\\\\\\\\\\\')
  console.log(session)
  console.log('\\\\\\\\\\\  END NextRequest END   \\\\\\\\\\\\\\')
  const isProtected = path.includes('/dashboard');

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && (
    path === '/login'
    // || path === '/register'
  )) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  return NextResponse.next();
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}