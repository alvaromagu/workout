import NextAuth from 'next-auth'
import { kysely } from '@/server-container'
import { Database, KyselyAdapter, KyselyAuth } from '@auth/kysely-adapter'
import { authConfig } from './auth-config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: '/sign-in' },
  adapter: KyselyAdapter(kysely as unknown as KyselyAuth<Database>),
  session: { strategy: 'jwt' },
  ...authConfig
})