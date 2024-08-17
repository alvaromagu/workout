import { type UserRepository } from '@/auth/domain/repositories/user-repository'

export class UserFinder {
  constructor (private readonly userRepository: UserRepository) { }

  /**
   * Find a user by email and password.
   * It can throw an exception if the user and password do not match.
   */
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
