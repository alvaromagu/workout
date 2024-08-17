import { EmailAlreadyInUse } from '@/auth/domain/exceptions/email-already-in-use'
import { CredentialUser } from '@/auth/domain/models/credential-user'
import { type CredentialUserRepository } from '@/auth/domain/repositories/credential-user-repository'

export class CredentialUserCreator {
  constructor (private readonly credentialUserRepository: CredentialUserRepository) { }

  async execute ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }): Promise<CredentialUser> {
    const credentialUser = new CredentialUser(crypto.randomUUID(), email, password, name)
    if (await this.credentialUserRepository.findByEmail(credentialUser.email) != null) {
      throw new EmailAlreadyInUse()
    }
    await this.credentialUserRepository.save(credentialUser)
    return credentialUser
  }
}
