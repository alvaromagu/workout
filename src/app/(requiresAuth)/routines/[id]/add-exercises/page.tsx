import { getRoutineAction } from '@/routine/infra/actions/get-routine-action'
import { RoutineExerciseForm } from '@/routine/infra/components/routine-exercise-form'
import { getTranslations } from 'next-intl/server'

export default async function AddExercisesPage ({
  params
}: {
  params: {
    id: string
  }
}) {
  const { routine } = await getRoutineAction(params.id)
  const t = await getTranslations()

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-2'>
        {t('routines.add-exercises')}
      </h1>
      <RoutineExerciseForm routineId={routine.id} />
    </div>
  )
}
