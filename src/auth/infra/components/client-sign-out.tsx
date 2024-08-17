'use client'

import { LabelButton } from '@/commons/infra/components/button'
import { IconDoorExit } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

export function ClientSignOut () {
  return (
    <LabelButton onClick={async () => {
      await signOut()
    }}>
      <IconDoorExit size={24} />
      <span>
        Cerrar sesión
      </span>
    </LabelButton>
  )
}
