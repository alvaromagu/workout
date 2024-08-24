import { RoutineExercise } from "../models/routine-exercise"

export interface RoutineExerciseRepository {
  save (routineExercise: RoutineExercise): Promise<void>
  saveBatch (routineExercises: RoutineExercise[]): Promise<void>
  update (routineExercise: RoutineExercise): Promise<void>
  delete (id: string): Promise<void>
}
