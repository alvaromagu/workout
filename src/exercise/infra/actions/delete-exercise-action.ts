'use server'

import { exerciseRepo } from '@/server-container'

export type DeleteExerciseActionState = {
  type: 'error'
  message: string
} | {
  type: 'success'
} | undefined

export async function deleteExerciseAction (id: string, _: DeleteExerciseActionState, __: FormData): Promise<DeleteExerciseActionState> {
  console.log('deleteExerciseAction', id)

  try {
    await exerciseRepo.delete(id)
  } catch (err) {
    if (err instanceof Error) {
      return { type: 'error', message: err.message }
    }
    return { type: 'error', message: 'Could not delete exercise' }
  }
  return {
    type: 'success'
  }
}
