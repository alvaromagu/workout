export class InvalidEmail extends Error {
  constructor (email?: string) {
    super(`Email "${email}" is invalid`)
  }
}
