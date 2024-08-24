import { BaseModel } from "@/commons/domain/models/base-model";
import { Primitives } from "@/commons/domain/types/to-primitives";

function validateId (id: unknown) {
  if (typeof id !== 'string') {
    throw new Error('Invalid id')
  }
}

function validateName (name: unknown) {
  if (typeof name !== 'string') {
    throw new Error('Invalid name')
  }
  if (name.length < 3) {
    throw new Error('Name too short')
  }
  if (name.length > 255) {
    throw new Error('Name too long')
  }
}

export class Routine implements BaseModel<Routine> {
  constructor (
    public readonly id: string,
    public readonly name: string,
  ) {
    validateId(id)
    validateName(name)
  }

  toPrimitives (): Primitives<Routine> {
    return {
      id: this.id,
      name: this.name,
    }
  }
}