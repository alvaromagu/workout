import { listExerciseAction } from '@/exercise/infra/actions/list-exercise-action'
import { DeleteExerciseForm } from '@/exercise/infra/components/delete-exercise-form'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function ExercisesPage () {
  const exercises = await listExerciseAction()
  return (
    <div className='p-2 py-0'>
      <h1 className='text-2xl mb-4'>Exercises</h1>
      <ul className='flex flex-col gap-2'>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <article className='flex items-center gap-2 dark:bg-zinc-900 rounded'>
              {exercise.image != null && (
                <img src={exercise.image} alt={exercise.name} className='w-16 h-16 object-cover rounded-l' />
              )}
              <div className='py-1 flex-1'>
                <h2>{exercise.name}</h2>
                <p>{exercise.description}</p>
                <p>{exercise.muscles}</p>
              </div>
              <div className='flex gap-2 items-center px-2'>
                <Link
                  href={`/exercises/edit/${exercise.id}`}
                  className='flex items-center justify-center rounded-full p-2 transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
                >
                  <IconEdit size={18} />
                </Link>
                <DeleteExerciseForm exerciseId={exercise.id} />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
