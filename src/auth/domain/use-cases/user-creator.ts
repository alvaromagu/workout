import { EmailAlreadyInUse } from '@/auth/domain/exceptions/email-already-in-use'
import { User } from '@/auth/domain/models/user'
import { type UserRepository } from '@/auth/domain/repositories/user-repository'
import { type Crypter } from '@/commons/domain/types/crypter'

export class UserCreator {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly crypter: Crypter
  ) { }

  async execute ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }): Promise<User> {
    const user = new User(
      crypto.randomUUID(),
      email,
      name,
      await this.crypter.hash(password),
      null,
      null
    )
    if (await this.userRepository.findByEmail(user.email) != null) {
      throw new EmailAlreadyInUse()
    }
    await this.userRepository.save(user)
    return user
  }
}
