import { getExerciseAction } from '@/exercise/infra/actions/get-exercise-action'
import { ExerciseForm } from '@/exercise/infra/components/exercise-form'
import { getTranslations } from 'next-intl/server'

export default async function EditPage ({
  params
}: {
  params: {
    id: string
  }
}) {
  const exercise = await getExerciseAction(params.id)
  const t = await getTranslations()

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>
        {t('exercises.edit-exercise')}
      </h1>
      <ExerciseForm exercise={exercise} />
    </div>
  )
}
