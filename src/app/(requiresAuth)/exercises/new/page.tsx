import { ExerciseForm } from '@/exercise/infra/components/exercise-form'
import { useTranslations } from 'next-intl'

export default function NewExercisePage () {
  const t = useTranslations()
  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>
        {t('exercises.new-exercise')}
      </h1>
      <ExerciseForm />
    </div>
  )
}
