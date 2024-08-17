'use client'

import { registerAction } from '@/auth/infra/actions/register-action'
import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

export default function RegisterPage () {
  const t = useTranslations()
  const [state, fromAction] = useFormState(registerAction, undefined)

  useEffect(() => {
    if (state == null) return
    toast.error(state.message)
  }, [state])

  return (
    <>
      <header className='flex items-center sticky top-0 gap-2 p-2 dark:bg-zinc-900'>
        <h1 className='text-2xl'>
          {t('register.register')}
        </h1>
      </header>
      <form
        action={fromAction}
        className='flex flex-col gap-4 pt-4 px-2'
      >
        <Label>
          {t('register.email')}
          <Input
            name='email'
            type='email'
            placeholder={`${t('register.email')}...`}
            required
          />
        </Label>
        <Label>
          {t('register.password')}
          <Input
            name='password'
            type='password'
            placeholder={`${t('register.password')}...`}
            minLength={8}
            required
          />
        </Label>
        <Label>
          {t('register.name')}
          <Input
            name='name'
            type='text'
            placeholder={`${t('register.name')}...`}
            minLength={2}
            required
          />
        </Label>
        <Input type='hidden' name='redirectTo' value='/' />
        <TextSubmitButton className='mt-2'>
          {t('register.register')}
        </TextSubmitButton>
        <Link href={'/sign-in'} className='underline w-fit'>
          {t('register.already-have-account')}
        </Link>
      </form>
    </>
  )
}
