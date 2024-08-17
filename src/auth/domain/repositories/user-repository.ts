import { type User } from '@/auth/domain/models/user'

export interface UserRepository {
  findByEmail: (email: string) => Promise<User | null>
  save: (user: User) => Promise<void>
}
