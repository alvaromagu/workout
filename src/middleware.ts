import NextAuth from 'next-auth'
import { authConfig } from './auth-config'

const authPathsRegex = /^(\/|\/exercises?.+|\/scraped-exercises)$/

const { auth } = NextAuth(authConfig)
export default auth(async function middleware (req) {
  const { pathname } = req.nextUrl
  const requireAuth = authPathsRegex.test(pathname)
  if (requireAuth && req.auth === null) {
    const redirectUrl = new URL('/sign-in', req.nextUrl.origin)
    console.log('Unauthorized access, redirecting to', redirectUrl.href)
    return Response.redirect(redirectUrl)
  }
})
