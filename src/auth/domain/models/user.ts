import { BaseModel } from '@/commons/domain/models/base-model'
import { Primitives } from '@/commons/domain/types/to-primitives'

export class User implements BaseModel<User> {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string | undefined | null,
    public readonly name: string,
    public readonly provider: string | undefined | null
  ) { }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      provider: this.provider
    }
  }
}