import { type Exercise } from '@/exercise/domain/types/exercise'
import { type RoutineExercise } from '../models/routine-exercise'
import { type Primitives } from '@/commons/domain/types/to-primitives'

export interface RoutineExercisePopulated {
  routineExercise: RoutineExercise
  exercise: Exercise
}

export interface RoutineExercisePopulatedPrimitives {
  routineExercise: Primitives<RoutineExercise>
  exercise: Primitives<Exercise>
}
