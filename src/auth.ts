import NextAuth from 'next-auth'
import { credentialsProvider } from '@/auth/infra/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialsProvider
  ],
})