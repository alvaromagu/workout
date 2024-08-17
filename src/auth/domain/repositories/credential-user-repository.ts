import { type CredentialUser } from '@/auth/domain/models/credential-user'

export interface CredentialUserRepository {
  findByEmail: (email: string) => Promise<CredentialUser | null>
  save: (credentialUser: CredentialUser) => Promise<void>
}
