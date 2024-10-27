import { PostgresDialect } from 'kysely'
import { KyselyAuth, type Database as NextAuthDatabase } from '@auth/kysely-adapter'
import pg from 'pg'
import { env } from '@/server-env'

const { Pool } = pg

type Database = NextAuthDatabase & {
  User: NextAuthDatabase['User'] & {
    password?: string | null
  }
  exercise: {
    id: string
    name: string
    description: string | null
    muscles: string | null
    image: string | null
  }
  routine: {
    id: string
    name: string
    user_id: string
  }
  routine_exercise: {
    id: string
    routine_id: string
    exercise_id: string
    target_reps: number
    target_steps: number
  }
}

export type KyselyDatabase = typeof db

export const db = new KyselyAuth<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      ssl: env.dbSsl
    })
  })
})
