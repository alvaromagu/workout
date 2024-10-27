import { listExerciseAction } from '@/exercise/infra/actions/list-exercise-action'
import { DeleteExerciseForm } from '@/exercise/infra/components/delete-exercise-form'
import { ExerciseItem } from '@/exercise/infra/components/exercise-item'
import { IconEdit } from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function ExercisesPage () {
  const exercises = await listExerciseAction()
  const t = await getTranslations()

  return (
    <div className='p-2 py-0'>
      <h1 className='text-2xl mb-4'>{t('exercises.exercises')}</h1>
      <ul className='flex flex-col gap-2'>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <ExerciseItem key={exercise.id} exercise={exercise} actions={(
              <>
                <Link
                  href={`/exercises/edit/${exercise.id}`}
                  className='flex items-center justify-center rounded-full p-2 transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
                >
                  <IconEdit size={18} />
                </Link>
                <DeleteExerciseForm exerciseId={exercise.id} />
              </>
            )}/>
          </li>
        ))}
      </ul>
    </div>
  )
}
