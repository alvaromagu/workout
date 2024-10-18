import { type ExercisePrimitives } from '@/exercise/domain/types/exercise-primitives'
import { type ReactNode } from 'react'

export function ExerciseItem ({
  exercise,
  actions
}: {
  exercise: ExercisePrimitives
  actions?: ReactNode
}) {
  return (
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
        {actions}
      </div>
    </article>
  )
}
