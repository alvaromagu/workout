'use client'

import { signOut } from 'next-auth/react'

export function ClientSignOut () {
  return (
    <button onClick={async () => {
      await signOut()
    }}>Logout</button>
  )
}
