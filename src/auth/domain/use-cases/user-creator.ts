import { EmailAlreadyInUse } from '@/auth/domain/exceptions/email-already-in-use'
import { User } from '@/auth/domain/models/user'
import { UserRepository } from '@/auth/domain/repositories/user-repository'

export class UserCreator {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }): Promise<User> {
    const user = new User(crypto.randomUUID(), email, password, name)
    if (await this.userRepository.findByEmail(user.email) != null) {
      throw new EmailAlreadyInUse()
    }
    await this.userRepository.save(user)
    return user
  }
}