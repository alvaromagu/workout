import { NextAuthConfig } from 'next-auth'
import { googleProvider } from './auth/infra/providers/google'

export const authConfig: NextAuthConfig =  {
  providers: [
    googleProvider
  ]
}