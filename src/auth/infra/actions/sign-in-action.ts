'use server'

import { signIn } from '@/auth'

type SignInActionState = {
  type: 'error'
  message: string
} | undefined

export async function signInAction (_: SignInActionState, formData: FormData): Promise<SignInActionState> {
  try {
    await signIn('credentials', formData)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if ('message' in error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return {
      type: 'error',
      message: 'Could not sign in'
    }
  }
  return undefined
}
