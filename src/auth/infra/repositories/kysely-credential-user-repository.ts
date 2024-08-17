import { CredentialUser } from '@/auth/domain/models/credential-user'
import { type CredentialUserRepository } from '@/auth/domain/repositories/credential-user-repository'
import { Repository } from '@/commons/infra/db/kysely-pg/repository'

export class KyselyCredentialUserRepository extends Repository implements CredentialUserRepository {
  async findByEmail (email: string): Promise<CredentialUser | null> {
    const row = await this.db
      .selectFrom('CredentialUser')
      .selectAll()
      .where('email', '=', email)
      .limit(1)
      .executeTakeFirst()
    if (row == null) {
      return null
    }
    return new CredentialUser(
      row.id,
      row.email,
      row.password,
      row.name
    )
  }

  async save (credentialUser: CredentialUser): Promise<void> {
    await this.db
      .insertInto('CredentialUser')
      .values(credentialUser.toPrimitives())
      .execute()
  }
}
