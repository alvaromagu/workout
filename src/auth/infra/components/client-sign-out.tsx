'use client'

import { signOut } from 'next-auth/react'

export function ClientSignOut () {
  return (
    <button onClick={() => {
      signOut()
    }}>Logout</button>
  )
}