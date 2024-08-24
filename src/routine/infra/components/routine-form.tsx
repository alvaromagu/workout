'use client'

import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { useTranslations } from 'next-intl'
import { createRoutineAction } from '../actions/create-routine-action'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export function RoutineForm () {
  const t = useTranslations()
  const [state, action] = useFormState(
    createRoutineAction,
    undefined
  )

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') toast.error(state.message)
    if (state.type === 'success') {
      toast.success(
        'Routine created successfully'
      )
      redirect('/routines')
    }
  }, [state])

  return (
    <form className='flex flex-col gap-2' action={action}>
      <Label>
        {t('routines.name')}
        <Input
          type='text'
          name='name'
          placeholder={t('routines.name-placeholder')}
          required
          maxLength={50}
        />
      </Label>
      <TextSubmitButton className='mt-4'>
        {t('routines.add')}
      </TextSubmitButton>
    </form>
  )
}
