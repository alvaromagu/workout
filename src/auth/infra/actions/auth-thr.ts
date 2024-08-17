'use server'

import { auth } from '@/auth'

export async function authThr () {
  const session = await auth()
  if (session == null) throw new Error('Session not found')
  return session
}
