import { type Exercise } from '../types/exercise'

export interface ExerciseRepository {
  // crud
  create: (exercise: Exercise) => Promise<Exercise>
  get: (id: string) => Promise<Exercise | null>
  update: (exercise: Exercise) => Promise<Exercise>
  delete: (id: string) => Promise<void>
  getAll: () => Promise<Exercise[]>
}
