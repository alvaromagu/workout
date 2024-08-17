import { KyselyCredentialUserRepository } from '@/auth/infra/repositories/kysely-credential-user-repository'
import { CredentialUserFinder } from '@/auth/domain/use-cases/credential-user-finder'
import { CredentialUserCreator } from '@/auth/domain/use-cases/credential-user-creator'
import { db } from '@/commons/infra/db/kysely-pg/db'

export const kysely = db
export const credentialUserRepo = new KyselyCredentialUserRepository(db)
export const credentialUserFinder = new CredentialUserFinder(credentialUserRepo)
export const credentialUserCreator = new CredentialUserCreator(credentialUserRepo)
