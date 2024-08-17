'use server'

import { credentialUserCreator } from '@/server-container'
import { signIn } from '@/auth'

type RegisterActionState = {
  type: 'error'
  message: string
} | undefined

export async function registerAction (_: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  try {
    const { email, password, name } = Object.fromEntries(formData) as { email: string, password: string, name: string }
    await credentialUserCreator.execute({ email, password, name })
    await signIn('credentials', formData)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if ('message' in error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return {
      type: 'error',
      message: 'Could not register user'
    }
  }
}
