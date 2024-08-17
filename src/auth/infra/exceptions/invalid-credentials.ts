import { AuthError } from 'next-auth'

export class InvalidCredentials extends AuthError {
  constructor () {
    super('Invalid credentials')
  }
}
