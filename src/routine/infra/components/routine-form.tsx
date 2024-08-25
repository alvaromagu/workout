'use client'

import { type Primitives } from '@/commons/domain/types/to-primitives'
import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { type Routine } from '@/routine/domain/models/routine'
import { useTranslations } from 'next-intl'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { createRoutineAction } from '../actions/create-routine-action'
import { updateRoutineAction } from '../actions/update-routine-action'

export function RoutineForm ({
  routine
}: {
  routine?: Primitives<Routine>
}) {
  const t = useTranslations()
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
    <form className='flex flex-col gap-2' action={action}>
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
      <TextSubmitButton className='mt-4'>
        {isEdit ? t('routines.update') : t('routines.add')}
      </TextSubmitButton>
    </form>
  )
}
