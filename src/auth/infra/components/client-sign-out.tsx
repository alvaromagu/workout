'use client'

import { IconDoorExit } from '@tabler/icons-react'
import { TextPendingButton } from '@/commons/infra/components/client-button'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

export function ClientSignOut () {
  const [pending, setPending] = useState(false)

  return (
    <form onClick={async (e) => {
      e.preventDefault()
      setPending(true)
      await signOut()
        .finally(() => {
          setPending(false)
        })
    }}>
      <TextPendingButton pending={pending} type='submit'>
        <IconDoorExit size={24} />
        <span>
          Cerrar sesión
        </span>
      </TextPendingButton>
    </form>
  )
}
