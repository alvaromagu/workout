'use client'

import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { ExerciseItem } from '@/exercise/infra/components/exercise-item'
import { type RoutineWithExercises } from '@/routine/domain/types/routine-exercise-populated'
import { IconEdit } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { createRoutineAction } from '../actions/create-routine-action'
import { updateRoutineAction } from '../actions/update-routine-action'

export function RoutineForm ({
  routineWithExercises
}: {
  routineWithExercises?: RoutineWithExercises
}) {
  const t = useTranslations()
  const routine = routineWithExercises?.routine
  const id = routine?.id
  const isEdit = id != null
  const [state, action] = useFormState(
    isEdit ? updateRoutineAction.bind(null, id) : createRoutineAction,
    undefined
  )

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') toast.error(state.message)
    if (state.type === 'success') {
      toast.success(
        isEdit ? 'Routine updated successfully' : 'Routine created successfully'
      )
      redirect('/routines')
    }
  }, [state, isEdit])

  return (
    <form className='flex flex-col gap-2 relative' action={action}>
      <Label>
        {t('routines.name')}
        <Input
          type='text'
          name='name'
          placeholder={t('routines.name-placeholder')}
          defaultValue={routine?.name}
          required
          maxLength={255}
        />
      </Label>
      {
        routineWithExercises != null && (
          <>
            <h3>
              Routine exercises
            </h3>
            <ul className='flex flex-col gap-2 px-2'>
              {routineWithExercises.exercises.map(({ routineExercise, exercise }) => (
                <li key={routineExercise.id}>
                  <ExerciseItem
                    exercise={exercise}
                    actions={
                      <>
                        <span className='px-2 py-1 rounded border dark:border-zinc-800'>
                          {routineExercise.targetSteps} x {routineExercise.targetReps}
                        </span>
                        <Link
                          href={`/routines/${routine?.id}/exercises/${routineExercise.id}/edit`}
                          className='flex items-center justify-center rounded-full p-2 transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
                        >
                          <IconEdit size={18} />
                        </Link>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </>
        )
      }
      <footer className='flex flex-col gap-2 sticky bottom-0 z-10 dark:bg-zinc-950 py-2'>
        <TextSubmitButton type='submit' className='dark:bg-zinc-950 w-full'>
          {isEdit ? t('routines.update') : t('routines.add')}
        </TextSubmitButton>
      </footer>
    </form>
  )
}
