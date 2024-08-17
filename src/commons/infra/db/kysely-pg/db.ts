import { PostgresDialect } from 'kysely'
import { KyselyAuth, type Database as NextAuthDatabase } from '@auth/kysely-adapter'
import pg from 'pg'

const { Pool } = pg

type Database = NextAuthDatabase & {
  CredentialUser: {
    id: string
    name: string
    email: string
    password: string
  }
}
export type KyselyDatabase = typeof db

export const db = new KyselyAuth<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    })
  })
})
