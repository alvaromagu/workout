'use server'

import { type UpdateCreateExerciseActionState } from '@/commons/infra/types/update-create-action-state'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { type Routine } from '@/routine/domain/models/routine'
import { RoutineExercise } from '@/routine/domain/models/routine-exercise'
import { routineExerciseRepo } from '@/server-container'
import { revalidateTag } from 'next/cache'

export async function updateRoutineExerciseAction (
  { routineId, routineExerciseId, exerciseId }: { routineId: Routine['id'], routineExerciseId: RoutineExercise['id'], exerciseId: Exercise['id'] },
  _: UpdateCreateExerciseActionState,
  formData: FormData
): Promise<UpdateCreateExerciseActionState> {
  const formObj = Object.fromEntries(formData)
  console.log(formObj)
  const routineExercise = new RoutineExercise(
    routineExerciseId,
    routineId,
    exerciseId,
    formObj.steps != null ? Number(formObj.steps) : null,
    formObj.reps != null ? Number(formObj.reps) : null,
    formObj.time != null ? 'time' : 'steps-reps',
    formObj.time != null ? String(formObj.time) : null
  )
  try {
    await routineExerciseRepo.update(routineExercise)
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
