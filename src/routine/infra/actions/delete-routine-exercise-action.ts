'use server'

import { routineExerciseRepo } from '@/server-container'

export type DeleteRoutineActionState = {
  type: 'error'
  message: string
} | {
  type: 'success'
} | undefined

export async function deleteRoutineExerciseAction (id: string): Promise<DeleteRoutineActionState> {
  try {
    await routineExerciseRepo.delete(id)
  } catch (err) {
    if (err instanceof Error) {
      return { type: 'error', message: err.message }
    }
    return { type: 'error', message: 'Could not delete routine' }
  }
  return {
    type: 'success'
  }
}
