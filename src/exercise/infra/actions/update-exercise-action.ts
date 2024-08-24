'use server'

import { Exercise } from '@/exercise/domain/types/exercise'
import { exerciseRepo } from '@/server-container'
import { revalidateTag } from 'next/cache'
import { type UpdateCreateExerciseActionState } from '../../../commons/infra/types/update-create-action-state'

export async function updateExerciseAction (id: string, _: UpdateCreateExerciseActionState, formData: FormData): Promise<UpdateCreateExerciseActionState> {
  const formObj = Object.fromEntries(formData)
  const exercise = new Exercise(
    id,
    formObj.name as string,
    formObj.description as string,
    formObj.muscles as string,
    formObj.image as string
  )
  try {
    await exerciseRepo.update(exercise)
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
