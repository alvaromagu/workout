'use client'

import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { createExerciseAction } from '@/exercise/infra/actions/create-exercise-action'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

export default function NewExercisePage () {
  const [state, action] = useFormState(createExerciseAction, undefined)

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') toast.error(state.message)
    if (state.type === 'success') {
      toast.success('Exercise created!')
      redirect('/exercises')
    }
  }, [state])

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>New Exercise</h1>
      <form className='flex flex-col gap-2' action={action}>
        <Label>
          Name
          <Input
            type='text'
            name='name'
            placeholder='Name, e.g. Squat'
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
            maxLength={255}
          />
        </Label>
        <Label>
          Muscles
          <Input
            type='text'
            name='muscles'
            placeholder='Muscles, e.g. Quadriceps. Separate with commas'
          />
        </Label>
        <Label>
          Image
          <Input
            type='text'
            name='image'
            placeholder='Image URL, e.g. https://example.com/squat.png'
          />
        </Label>
        <TextSubmitButton className='mt-4'>
          Create
        </TextSubmitButton>
      </form>
    </div>
  )
}
