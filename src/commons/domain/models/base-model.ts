import { type Primitives } from '@/commons/domain/types/to-primitives'

export interface BaseModel<T> {
  toPrimitives: () => Primitives<T>
}
