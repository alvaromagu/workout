import { EmailAlreadyInUse } from '@/auth/domain/exceptions/email-already-in-use'
import { User } from '@/auth/domain/models/user'
import { type UserRepository } from '@/auth/domain/repositories/user-repository'
import { type Crypter } from '@/commons/domain/types/crypter'
import { InvalidPassword } from '../exceptions/invalid-password'
import { InvalidName } from '../exceptions/invalid-name'
import { InvalidEmail } from '../exceptions/invalid-email'

function checkPassword (password: unknown) {
  if (typeof password !== 'string') {
    throw new InvalidPassword()
  }
  if (password.length < 8) {
    throw new InvalidPassword(password)
  }
}

function checkName (name: unknown) {
  if (typeof name !== 'string') {
    throw new InvalidName()
  }
  if (name.length < 2) {
    throw new InvalidName(name)
  }
}

function checkEmail (email: unknown) {
  if (typeof email !== 'string') {
    throw new InvalidEmail()
  }
  const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if (!re.test(email)) {
    throw new InvalidEmail(email)
  }
}

export class UserCreator {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly crypter: Crypter
  ) { }

  /**
   * This method is designed to create a new from credentials form.
   * Email, password and name are validated before creating the user.
   * @param {email: string, password: string, name: string} user
   * @returns
   */
  async execute ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }): Promise<User> {
    if (await this.userRepository.findByEmail(email) != null) {
      throw new EmailAlreadyInUse()
    }
    checkEmail(email)
    checkPassword(password)
    checkName(name)
    const user = new User(
      crypto.randomUUID(),
      email,
      name,
      await this.crypter.hash(password),
      null,
      null
    )
    await this.userRepository.save(user)
    return user
  }
}
