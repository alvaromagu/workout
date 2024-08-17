import { type BaseModel } from '@/commons/domain/models/base-model'
import { type Primitives } from '@/commons/domain/types/to-primitives'

function checkId (id: unknown) {
  if (typeof id !== 'string') {
    throw new Error('Invalid id')
  }
}

function checkName (name: unknown) {
  if (typeof name !== 'string') {
    throw new Error('Invalid name')
  }
  if (name.length > 50) {
    throw new Error('Name is too long')
  }
}

function checkDescription (description: unknown) {
  if (description == null) {
    return
  }
  if (typeof description !== 'string') {
    throw new Error('Invalid description')
  }
  if (description.length > 255) {
    throw new Error('Description is too long')
  }
}

function checkMuscles (muscles: unknown) {
  if (muscles == null) {
    return
  }
  if (typeof muscles !== 'string') {
    throw new Error('Invalid muscles')
  }
}

function checkImage (image: unknown) {
  if (image == null) {
    return
  }
  if (typeof image !== 'string') {
    throw new Error('Invalid image')
  }
}

export class Exercise implements BaseModel<Exercise> {
  constructor (
    public id: string,
    public name: string,
    public description: string | null,
    public muscles: string | null,
    public image: string | null
  ) {
    checkId(id)
    checkName(name)
    checkDescription(description)
    checkMuscles(muscles)
    checkImage(image)
  }

  toPrimitives (): Primitives<Exercise> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      muscles: this.muscles,
      image: this.image
    }
  }
}
