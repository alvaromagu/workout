import { type BaseModel } from '@/commons/domain/models/base-model'
import { type Primitives } from '@/commons/domain/types/to-primitives'

export class User implements BaseModel<User> {
  constructor (
    public readonly id: string,
    public readonly email: string,
    public readonly name: string | null | undefined,
    public readonly password: string | null | undefined,
    public readonly emailVerified: Date | null,
    public readonly image: string | null | undefined
  ) {
    // dont validate the model becose this model is shared with next-auth lib.
    // it only will be validated in the user-creator use case that's used for 
    // credentials register.
  }

  toPrimitives (): Primitives<User> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      emailVerified: this.emailVerified,
      image: this.image
    }
  }
}
