'use client'

import { signInAction } from '@/auth/infra/actions/sign-in-action'
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
      <Link href={'/register'} className='underline'>
        Don&apos;t have an account? Register
      </Link>
      <div className='relative flex justify-center before:block before:w-full before:absolute before:h-px before:inset-y-1/2 before:bg-gray-700' >
        <div className='dark:bg-zinc-950 z-10 px-2'>or</div>
      </div>
      <button onClick={async () => {
        await signIn('google', {
          callbackUrl: '/'
        })
      }} type='button' className='bg-blue-950 hover:bg-blue-900 transition-colors p-2'>
        Sign in with Google
      </button>
    </form>
  )
}
