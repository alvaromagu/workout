import { KyselyDatabase } from './db'

export class Repository {
  constructor (protected readonly db: KyselyDatabase) {}
}