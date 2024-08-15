'use client'

import { signInAction } from '@/auth/infra/actions/sign-in-action'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export default function SignInPage() {
  const [state, fromAction] = useFormState(signInAction, undefined)

  useEffect(() => {
    if (state == null) return
    alert(state.message)
  }, [state])

  return (
    <form
      action={fromAction}
      className='flex flex-col gap-4 pt-4'
    >
      <h1 className='text-2xl'>Sign In</h1>
      <label className='flex flex-col'>
        Email
        <input name='email' type='email' className='bg-zinc-900 px-2 py-1' />
      </label>
      <label className='flex flex-col'>
        Password
        <input name='password' type='password' className='bg-zinc-900 px-2 py-1' />
      </label>
      <input type='hidden' name='redirectTo' value='/' />
      <button className='bg-blue-950 hover:bg-blue-900 transition-colors p-2 mt-4'>
        Sign In
      </button>
      <Link href={'/register'}>
        Don&apos;t have an account? Register
      </Link>
    </form>
  )
}

