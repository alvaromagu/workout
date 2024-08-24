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
import { useTranslations } from 'next-intl'

export function ExerciseForm ({
  exercise
}: {
  exercise?: Partial<Primitives<Exercise>>
}) {
  const t = useTranslations()
  const id = exercise?.id
  const isEdit = id != null
  const [state, action] = useFormState(
    isEdit ? updateExerciseAction.bind(null, id) : createExerciseAction,
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
        {t('exercises.name')}
        <Input
          type='text'
          name='name'
          placeholder={t('exercises.name-placeholder')}
          defaultValue={exercise?.name}
          required
          maxLength={50}
        />
      </Label>
      <Label>
        {t('exercises.description')}
        <Input
          type='text'
          name='description'
          placeholder={t('exercises.description-placeholder')}
          defaultValue={exercise?.description ?? undefined}
          maxLength={255}
        />
      </Label>
      <Label>
        {t('exercises.muscles')}
        <Input
          type='text'
          name='muscles'
          placeholder={t('exercises.muscles-placeholder')}
          defaultValue={exercise?.muscles ?? undefined}
        />
      </Label>
      <Label>
        {t('exercises.image')}
        <Input
          type='text'
          name='image'
          placeholder={t('exercises.image-placeholder')}
          defaultValue={exercise?.image ?? undefined}
        />
      </Label>
      <TextSubmitButton className='mt-4'>
        {isEdit ? t('exercises.update') : t('exercises.add')}
      </TextSubmitButton>
    </form>
  )
}
