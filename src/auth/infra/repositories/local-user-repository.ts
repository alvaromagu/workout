import { User } from '@/auth/domain/models/user'
import { UserRepository } from '@/auth/domain/repositories/user-repository'

export class LocalUserRepository implements UserRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}