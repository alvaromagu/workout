'use server'

import { type RoutineExercisePopulatedPrimitives } from '@/routine/domain/types/routine-exercise-populated'
import { routineExerciseRepo } from '@/server-container'

export async function getRoutineExercisePopulated (id: string): Promise<RoutineExercisePopulatedPrimitives> {
  const routineExercisePopulated = await routineExerciseRepo.getPopulatedById(id)
  if (routineExercisePopulated == null) {
    throw new Error('Routine exercise not found')
  }
  return {
    routineExercise: routineExercisePopulated.routineExercise.toPrimitives(),
    exercise: routineExercisePopulated.exercise.toPrimitives()
  }
}
