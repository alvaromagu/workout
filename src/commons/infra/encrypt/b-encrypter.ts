import { type Crypter } from '@/commons/domain/types/crypter'
import { env } from '@/server-env'
import bcrypt from 'bcrypt'

export class BCrypter implements Crypter {
  private readonly salts = env.salts ?? 12

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salts)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
