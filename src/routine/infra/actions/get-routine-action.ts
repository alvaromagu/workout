'use server'

import { type RoutineWithExercises } from '@/routine/domain/types/routine-exercise-populated'
import { routineExerciseRepo, routinesRepo } from '@/server-container'
import { notFound } from 'next/navigation'

export async function getRoutineAction (id: string): Promise<RoutineWithExercises> {
  const routine = await routinesRepo.get(id)
  if (routine == null) notFound()
  const routineExercises = await routineExerciseRepo.getPopulatedByRoutineId(id)
  return {
    routine: routine.toPrimitives(),
    exercises: routineExercises.map(({ routineExercise, exercise }) => {
      return {
        routineExercise: routineExercise.toPrimitives(),
        exercise: exercise.toPrimitives()
      }
    })
  }
}
