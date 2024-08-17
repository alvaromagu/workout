'use client'

import { signInAction } from '@/auth/infra/actions/sign-in-action'
import { TextSubmitButton } from '@/commons/infra/components/client-button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export default function SignInPage () {
  const [state, fromAction] = useFormState(signInAction, undefined)

  useEffect(() => {
    if (state == null) return
    alert(state.message)
  }, [state])

  return (
    <>
      <header className='flex items-center sticky top-0 gap-2 p-2 dark:bg-zinc-900'>
        <h1 className='text-2xl'>Sign In</h1>
      </header>
      <form
        action={fromAction}
        className='flex flex-col gap-4 pt-4 px-2'
      >
        <Label>
          Email
          <Input
            name='email'
            type='email'
            placeholder='Email...'
            required
          />
        </Label>
        <Label>
          Password
          <Input
            name='password'
            type='password'
            placeholder='Password...'
            required
          />
        </Label>
        <Input type='hidden' name='redirectTo' value='/' />
        <TextSubmitButton className='mt-4'>
          Sign In
        </TextSubmitButton>
        <Link href={'/register'} className='underline w-fit'>
          Don&apos;t have an account? Register
        </Link>
        <div className='relative flex justify-center before:block before:w-full before:absolute before:h-px before:inset-y-1/2 dark:before:bg-gray-700' >
          <div className='dark:bg-zinc-950 z-10 px-2'>or</div>
        </div>
        <TextSubmitButton
          className='hover:dark:bg-blue-800 duration-300'
          onClick={async () => {
            await signIn('google', {
              callbackUrl: '/'
            })
          }} type='button'
        >
          <span>Sign in with</span>
          <IconBrandGoogleFilled className='text-red-400' />
        </TextSubmitButton>
      </form>
    </>
  )
}
