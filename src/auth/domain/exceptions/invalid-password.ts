export class InvalidPassword extends Error {
  constructor (password?: string) {
    super(`Password "${password}" is invalid`)
  }
}
