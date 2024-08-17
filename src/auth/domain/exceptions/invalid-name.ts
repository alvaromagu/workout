export class InvalidName extends Error {
  constructor (name?: unknown) {
    super(`Invalid name: ${name}`)
  }
}