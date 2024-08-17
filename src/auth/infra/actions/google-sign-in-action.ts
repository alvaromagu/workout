'use server'

import { signIn } from '@/auth'

type SignInActionState = {
  type: 'error'
  message: string
} | undefined

export async function googleSignInAction (_: SignInActionState, formData: FormData): Promise<SignInActionState> {
  try {
    await signIn('google', {
      redirectTo: '/'
    })
  } catch (err) {
    console.log('sign in error', err)
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err
    }
  }
  return undefined
}
