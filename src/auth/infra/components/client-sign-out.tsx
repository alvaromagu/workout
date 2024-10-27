'use client'

import { IconDoorExit } from '@tabler/icons-react'
import { TextPendingButton } from '@/commons/infra/components/client-button'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function ClientSignOut () {
  const t = useTranslations()
  const [pending, setPending] = useState(false)

  return (
    <form onClick={async (e) => {
      e.preventDefault()
      setPending(true)
      await signOut({
        redirect: true,
        callbackUrl: '/sign-in'
      })
        .finally(() => {
          setPending(false)
        })
    }}>
      <TextPendingButton pending={pending} type='submit'>
        <IconDoorExit size={24} />
        <span>
          {t('home-page.sign-out')}
        </span>
      </TextPendingButton>
    </form>
  )
}
