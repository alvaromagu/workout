'use client'

import { registerAction } from '@/auth/infra/actions/register-action'
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
    <form
      action={fromAction}
      className='flex flex-col gap-4 pt-4'
    >
      <h1 className='text-2xl'>Register</h1>
      <label className='flex flex-col'>
        Email
        <input name='email' type='email' className='bg-zinc-900 px-2 py-1' />
      </label>
      <label className='flex flex-col'>
        Password
        <input name='password' type='password' className='bg-zinc-900 px-2 py-1' />
      </label>
      <label className='flex flex-col'>
        Name
        <input name='name' type='text' className='bg-zinc-900 px-2 py-1' />
      </label>
      <input type='hidden' name='redirectTo' value='/' />
      <button className='bg-blue-950 hover:bg-blue-900 transition-colors p-2 mt-4'>
        Register
      </button>
      <Link href={'/sign-in'} className='underline'>
        Already have an account? Login
      </Link>
    </form>
  )
}
