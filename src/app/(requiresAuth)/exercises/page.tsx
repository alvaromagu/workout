import { listExerciseAction } from '@/exercise/infra/actions/list-exercise-action'
import Link from 'next/link'

export default async function ExercisesPage () {
  const exercises = await listExerciseAction()
  return (
    <div className='p-2'>
      <nav>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises/new'>
              New Exercise
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className='text-2xl mb-4'>Exercises</h1>
      <ul className='flex flex-col gap-2'>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <article className='flex gap-2 dark:bg-zinc-900 rounded'>
              {exercise.image != null && (
                <img src={exercise.image} alt={exercise.name} className='w-16 h-16 object-cover rounded-l' />
              )}
              <div className='py-1'>
                <h2>{exercise.name}</h2>
                <p>{exercise.description}</p>
                <p>{exercise.muscles}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
