import { type UserRepository } from '@/auth/domain/repositories/user-repository'
import { type Crypter } from '@/commons/domain/types/crypter'

export class UserFinder {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly crypter: Crypter
  ) { }

  async findByCredentials ({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    const user = await this.userRepository.findByEmail(email)
    return user?.password == null || !await this.crypter.compare(password, user.password) ? null : user
  }
}
