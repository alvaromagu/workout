import { db } from '@/commons/infra/db/kysely-pg/db'
import { KyselyUserRepository } from './auth/infra/repositories/kysely-user-repository'
import { UserFinder } from './auth/domain/use-cases/user-finder'
import { UserCreator } from './auth/domain/use-cases/user-creator'
import { BCrypter } from './commons/infra/encrypt/b-encrypter'

const crypter = new BCrypter()
export const kysely = db
export const userRepo = new KyselyUserRepository(db)
export const userFinder = new UserFinder(userRepo, crypter)
export const userCreator = new UserCreator(userRepo, crypter)
