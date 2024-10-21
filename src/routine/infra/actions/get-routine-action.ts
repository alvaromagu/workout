'use server'

import { type Primitives } from '@/commons/domain/types/to-primitives'
import { type Routine } from '@/routine/domain/models/routine'
import { type RoutineExercisePopulatedPrimitives } from '@/routine/domain/types/routine-exercise-populated'
import { routineExerciseRepo, routinesRepo } from '@/server-container'
import { notFound } from 'next/navigation'

export async function getRoutineAction (id: string): Promise<{
  routine: Primitives<Routine>
  routineExercises: RoutineExercisePopulatedPrimitives[]
}> {
  const routine = await routinesRepo.get(id)
  if (routine == null) notFound()
  const routineExercises = await routineExerciseRepo.getPopulatedByRoutineId(id)
  return {
    routine: routine.toPrimitives(),
    routineExercises: routineExercises.map(({ routineExercise, exercise }) => {
      return {
        routineExercise: routineExercise.toPrimitives(),
        exercise: exercise.toPrimitives()
      }
    })
  }
}
