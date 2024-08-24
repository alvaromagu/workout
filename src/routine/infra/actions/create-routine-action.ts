'use server'

import { routinesRepo } from '@/server-container'
import { revalidateTag } from 'next/cache'
import { type UpdateCreateExerciseActionState } from '@/commons/infra/types/update-create-action-state'
import { Routine } from '@/routine/domain/models/routine'
import { authThr } from '@/auth/infra/actions/auth-thr'

export async function createRoutineAction (_: UpdateCreateExerciseActionState, formData: FormData): Promise<UpdateCreateExerciseActionState> {
  const auth = await authThr()
  const formObj = Object.fromEntries(formData)
  const exercise = new Routine(
    crypto.randomUUID(),
    formObj.name as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    auth.userId
  )
  try {
    await routinesRepo.save(exercise)
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'NEXT_REDIRECT') { throw err }
      return { type: 'error', message: err.message }
    }
  }
  revalidateTag('/routines')
  return {
    type: 'success'
  }
}
