'use client'

import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { createExerciseAction } from '../actions/create-exercise-action'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { type Primitives } from '@/commons/domain/types/to-primitives'
import { updateExerciseAction } from '../actions/update-exercise-action'

export function ExerciseForm ({
  exercise
}: {
  exercise?: Primitives<Exercise>
}) {
  const isEdit = exercise != null
  const [state, action] = useFormState(
    exercise != null ? updateExerciseAction.bind(null, exercise.id) : createExerciseAction,
    undefined
  )

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') toast.error(state.message)
    if (state.type === 'success') {
      toast.success(
        isEdit ? 'Exercise updated successfully' : 'Exercise created successfully'
      )
      redirect('/exercises')
    }
  }, [state, isEdit])

  return (
    <form className='flex flex-col gap-2' action={action}>
      <Label>
        Name
        <Input
          type='text'
          name='name'
          placeholder='Name, e.g. Squat'
          defaultValue={exercise?.name}
          required
          maxLength={50}
        />
      </Label>
      <Label>
        Description
        <Input
          type='text'
          name='description'
          placeholder='Description, e.g. Stand with your feet shoulder-width apart'
          defaultValue={exercise?.description ?? undefined}
          maxLength={255}
        />
      </Label>
      <Label>
        Muscles
        <Input
          type='text'
          name='muscles'
          placeholder='Muscles, e.g. Quadriceps. Separate with commas'
          defaultValue={exercise?.muscles ?? undefined}
        />
      </Label>
      <Label>
        Image
        <Input
          type='text'
          name='image'
          placeholder='Image URL, e.g. https://example.com/squat.png'
          defaultValue={exercise?.image ?? undefined}
        />
      </Label>
      <TextSubmitButton className='mt-4'>
        {isEdit ? 'Update' : 'Create'}
      </TextSubmitButton>
    </form>
  )
}
