import { LocalUserRepository } from '@/auth/infra/repositories/local-user-repository'
import { UserFinder } from '@/auth/domain/use-cases/user-finder'
import { UserCreator } from '@/auth/domain/use-cases/user-creator'

export const userRepo = new LocalUserRepository()
export const userFinder = new UserFinder(userRepo)
export const userCreator = new UserCreator(userRepo)