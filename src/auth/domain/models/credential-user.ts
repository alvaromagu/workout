import { type BaseModel } from '@/commons/domain/models/base-model'
import { type Primitives } from '@/commons/domain/types/to-primitives'

export class CredentialUser implements BaseModel<CredentialUser> {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly name: string
  ) { }

  toPrimitives (): Primitives<CredentialUser> {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name
    }
  }
}
