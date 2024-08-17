import { type UserRepository } from '@/auth/domain/repositories/user-repository'

export class UserFinder {
  constructor (private readonly userRepository: UserRepository) { }

  async findByCredentials ({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    const user = await this.userRepository.findByEmail(email)
    return user?.password === password ? user : null
  }
}
