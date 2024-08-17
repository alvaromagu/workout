import { User } from '@/auth/domain/models/user'
import { type UserRepository } from '@/auth/domain/repositories/user-repository'
import { Repository } from '@/commons/infra/db/kysely-pg/repository'

export class KyselyUserRepository extends Repository implements UserRepository {
  async findByEmail (email: string): Promise<User | null> {
    const row = await this.db
      .selectFrom('User')
      .selectAll()
      .where('email', '=', email)
      .limit(1)
      .executeTakeFirst()
    if (row == null) {
      return null
    }
    return new User(
      row.id,
      row.email,
      row.name,
      row.password,
      row.emailVerified,
      row.image
    )
  }

  async save (user: User): Promise<void> {
    await this.db
      .insertInto('User')
      .values(user.toPrimitives())
      .execute()
  }
}
