import { getRoutineExercisePopulated } from '@/routine/infra/actions/get-routine-exercise-populated-action'
import { RoutineExerciseForm } from '@/routine/infra/components/routine-exercise-form'
import { getTranslations } from 'next-intl/server'

export default async function EditRoutineExercisesPage ({
  params
}: {
  params: {
    id: string
    routineExerciseId: string
  }
}) {
  const routineExercise = await getRoutineExercisePopulated(params.routineExerciseId)
  const t = await getTranslations()

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-2'>
        {t('routines.add-exercises')}
      </h1>
      <RoutineExerciseForm routineId={params.id} routineExercise={routineExercise} />
    </div>
  )
}
