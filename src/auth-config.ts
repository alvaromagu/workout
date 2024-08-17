import { type NextAuthConfig } from 'next-auth'
import { googleProvider } from './auth/infra/providers/google'
import { credentialsProvider } from './auth/infra/providers/credentials'

export const authConfig: NextAuthConfig = {
  providers: [
    googleProvider,
    credentialsProvider
  ]
}
