'use client'

import { registerAction } from '@/auth/infra/actions/register-action'
import { LabelButton } from '@/commons/infra/components/button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export default function RegisterPage () {
  const [state, fromAction] = useFormState(registerAction, undefined)

  useEffect(() => {
    if (state == null) return
    alert(state.message)
  }, [state])

  return (
    <>
      <header className='flex items-center sticky top-0 gap-2 p-2 dark:bg-zinc-900'>
        <h1 className='text-2xl'>Register</h1>
      </header>
      <form
        action={fromAction}
        className='flex flex-col gap-4 pt-4'
      >
        <Label>
          Email
          <Input
            name='email'
            type='email'
            required
          />
        </Label>
        <Label>
          Password
          <Input
            name='password'
            type='password'
            required
          />
        </Label>
        <Label>
          Name
          <Input
            name='name'
            type='text'
            required
          />
        </Label>
        <Input type='hidden' name='redirectTo' value='/' />
        <LabelButton className='mt-2'>
          Register
        </LabelButton>
        <Link href={'/sign-in'} className='underline w-fit'>
          Already have an account? Login
        </Link>
      </form>
    </>
  )
}
