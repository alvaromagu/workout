import { sql } from 'kysely'
import { db } from '@/commons/infra/db/kysely-pg/db'

export async function up (): Promise<void> {
  await db.schema
    .createTable('exercise')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'varchar(50)', (col) => col.notNull())
    .addColumn('description', 'varchar(255)')
    .addColumn('muscles', 'text')
    .addColumn('image', 'text')
    .execute()
}

export async function down (): Promise<void> {
  await db.schema
    .dropTable('exercise')
    .execute()
}
