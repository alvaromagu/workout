'use server'

import { authThr } from '@/auth/infra/actions/auth-thr'
import { Routine } from '@/routine/domain/models/routine'
import { routinesRepo } from '@/server-container'
import { revalidateTag } from 'next/cache'
import { type UpdateCreateExerciseActionState } from '../../../commons/infra/types/update-create-action-state'

export async function updateRoutineAction (id: string, _: UpdateCreateExerciseActionState, formData: FormData): Promise<UpdateCreateExerciseActionState> {
  const { userId } = await authThr()
  const routine = await routinesRepo.get(id)
  if (routine?.userId !== userId) {
    throw new Error('You can only update your own routines')
  }
  const formObj = Object.fromEntries(formData)
  const updatedRoutine = new Routine(
    routine.id,
    formObj.name as string,
    routine.userId
  )
  try {
    await routinesRepo.update(updatedRoutine)
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'NEXT_REDIRECT') { throw err }
      return { type: 'error', message: err.message }
    }
  }
  revalidateTag('/exercises')
  return {
    type: 'success'
  }
}
