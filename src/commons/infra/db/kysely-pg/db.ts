import { PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { KyselyAuth, Database as NextAuthDatabase } from '@auth/kysely-adapter'
 
type Database = NextAuthDatabase & {}
 
export const db = new KyselyAuth<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }),
  }),
})