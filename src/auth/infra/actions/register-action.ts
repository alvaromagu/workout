'use server'

import { userCreator } from '@/server-container'
import { signIn } from '@/auth'
import { EmailAlreadyInUse } from '@/auth/domain/exceptions/email-already-in-use'
import { InvalidEmail } from '@/auth/domain/exceptions/invalid-email'
import { InvalidPassword } from '@/auth/domain/exceptions/invalid-password'
import { InvalidName } from '@/auth/domain/exceptions/invalid-name'

const errorMapper = (err: unknown) => {
  if (!(err instanceof Error)) {
    return 'Could not register user'
  }
  switch (err.constructor) {
    case EmailAlreadyInUse:
      return 'Email already in use'
    case InvalidEmail:
      return 'Invalid email'
    case InvalidPassword:
      return 'Invalid password'
    case InvalidName:
      return 'Invalid name'
    default:
      return 'Could not register user'
  }
}

type RegisterActionState = {
  type: 'error'
  message: string
} | undefined

export async function registerAction (_: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  try {
    const { email, password, name } = Object.fromEntries(formData) as { email: string, password: string, name: string }
    await userCreator.execute({ email, password, name })
    await signIn('credentials', formData)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if ('message' in error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return {
      type: 'error',
      message: errorMapper(error)
    }
  }
}
