'use client'

import { googleSignInAction } from '@/auth/infra/actions/google-sign-in-action'
import { signInAction } from '@/auth/infra/actions/sign-in-action'
import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

export default function SignInPage (props: {
  searchParams: {
    error?: string
  }
}) {
  const t = useTranslations()
  const [status, action] = useFormState(signInAction, undefined)

  useEffect(() => {
    if (props.searchParams.error === 'OAuthAccountNotLinked') {
      toast.error('Account is liked to credentials, please sign in with email and password', {
        id: 'OAuthAccountNotLinked'
      })
    }
    return () => {
      toast.dismiss('OAuthAccountNotLinked')
    }
  }, [props.searchParams.error])

  useEffect(() => {
    if (status?.type === 'error') {
      toast.error(status.message)
    }
  }, [status])

  return (
    <>
      <header className='flex items-center sticky top-0 gap-2 p-2 dark:bg-zinc-900'>
        <h1 className='text-2xl'>{t('sign-in.sign-in')}</h1>
      </header>
      <form
        action={action}
        className='flex flex-col gap-4 pt-4 px-2'
      >
        <Label>
          {t('sign-in.email')}
          <Input
            name='email'
            type='email'
            placeholder={`${t('sign-in.email')}...`}
            required
          />
        </Label>
        <Label>
          {t('sign-in.password')}
          <Input
            name='password'
            type='password'
            placeholder={`${t('sign-in.password')}...`}
            required
          />
        </Label>
        <Input type='hidden' name='redirectTo' value='/' />
        <TextSubmitButton className='mt-4'>
          {t('sign-in.sign-in')}
        </TextSubmitButton>
        <Link href={'/register'} className='underline w-fit'>
          {t('sign-in.dont-have-account')}
        </Link>
        <div className='relative flex justify-center before:block before:w-full before:absolute before:h-px before:inset-y-1/2 dark:before:bg-gray-700' >
          <div className='dark:bg-zinc-950 z-10 px-2'>
            {t('sign-in.or')}
          </div>
        </div>
      </form>
      <form className='p-2 flex flex-col' action={googleSignInAction.bind(undefined, undefined)}>
        <TextSubmitButton>
          <span>
            {t('sign-in.sign-in-with')}
          </span>
          <IconBrandGoogleFilled className='text-red-400' />
        </TextSubmitButton>
      </form>
    </>
  )
}
