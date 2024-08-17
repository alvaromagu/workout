'use server'

import { signIn } from '@/auth'
import { InvalidCredentials } from '../exceptions/invalid-credentials'

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
    if (error instanceof InvalidCredentials) {
      return {
        type: 'error',
        message: 'Invalid credentials'
      }
    }
    return {
      type: 'error',
      message: 'Could not sign in'
    }
  }
  return undefined
}
