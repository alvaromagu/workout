import { IconDoorExit } from '@tabler/icons-react'
import { signOut } from '@/auth'
import { TextSubmitButton } from '@/commons/infra/components/client-button'

export function ClientSignOut () {
  return (
    <form action={async () => {
      'use server'
      await signOut()
    }}>
      <TextSubmitButton type='submit'>
        <IconDoorExit size={24} />
        <span>
          Cerrar sesión
        </span>
      </TextSubmitButton>
    </form>
  )
}
