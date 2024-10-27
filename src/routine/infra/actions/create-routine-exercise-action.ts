'use server'

import { type UpdateCreateExerciseActionState } from '@/commons/infra/types/update-create-action-state'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { type Routine } from '@/routine/domain/models/routine'
import { RoutineExercise } from '@/routine/domain/models/routine-exercise'
import { routineExerciseRepo } from '@/server-container'
import { revalidateTag } from 'next/cache'

export async function createRoutineExerciseAction (
  { routineId, exerciseId }: { routineId: Routine['id'], exerciseId: Exercise['id'] },
  _: UpdateCreateExerciseActionState,
  formData: FormData
): Promise<UpdateCreateExerciseActionState> {
  const formObj = Object.fromEntries(formData)
  const routineExercise = new RoutineExercise(
    crypto.randomUUID(),
    routineId,
    exerciseId,
    Number(formObj.steps),
    Number(formObj.reps),
    formObj.time == null ? 'steps-reps' : 'time',
    String(formObj.time)
  )
  try {
    await routineExerciseRepo.save(routineExercise)
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
