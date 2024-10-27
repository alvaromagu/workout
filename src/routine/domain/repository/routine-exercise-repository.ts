import { type RoutineExercise } from '../models/routine-exercise'
import { type RoutineExercisePopulated } from '../types/routine-exercise-populated'

export interface RoutineExerciseRepository {
  save: (routineExercise: RoutineExercise) => Promise<void>
  saveBatch: (routineExercises: RoutineExercise[]) => Promise<void>
  update: (routineExercise: RoutineExercise) => Promise<void>
  delete: (id: string) => Promise<void>
  getPopulatedById: (id: string) => Promise<RoutineExercisePopulated | null>
  getPopulatedByRoutineId: (routineId: string) => Promise<RoutineExercisePopulated[]>
}
