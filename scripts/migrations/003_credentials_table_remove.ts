import { type Kysely, sql } from 'kysely'

export async function up (db: Kysely<any>): Promise<void> {
  await db.schema
    .dropTable('CredentialUser')
    .execute()

  await db.schema
    .alterTable('User')
    .addColumn('password', 'varchar(100)')
    .execute()
}

export async function down (db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('User')
    .dropColumn('password')
    .execute()

  await db.schema
    .createTable('CredentialUser')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text')
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .execute()
}
