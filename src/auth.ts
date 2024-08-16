import NextAuth from 'next-auth'
import { kysely } from '@/server-container'
import { KyselyAdapter } from '@auth/kysely-adapter'
import { authConfig } from './auth-config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: '/sign-in' },
  adapter: KyselyAdapter(kysely),
  session: { strategy: 'jwt' },
  ...authConfig
})