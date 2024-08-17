import { type CredentialUserRepository } from '@/auth/domain/repositories/credential-user-repository'

export class CredentialUserFinder {
  constructor (private readonly credentialUserRepository: CredentialUserRepository) { }

  async findByCredentials ({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    const credentialUser = await this.credentialUserRepository.findByEmail(email)
    return credentialUser?.password === password ? credentialUser : null
  }
}
