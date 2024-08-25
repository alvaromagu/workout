'use server'

import { routinesRepo } from '@/server-container'

export type DeleteRoutineActionState = {
  type: 'error'
  message: string
} | {
  type: 'success'
} | undefined

export async function deleteRoutineAction (id: string, _: DeleteRoutineActionState, __: FormData): Promise<DeleteRoutineActionState> {
  try {
    await routinesRepo.delete(id)
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
