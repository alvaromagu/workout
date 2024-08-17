'use client'

import { withFormStatus } from '@/client-utils'
import { TextButton } from './button'
import { cn, withProps } from '@/utils'
import { type FormStatus } from 'react-dom'
import { type ComponentProps, type ReactNode } from 'react'
import { Spinner } from './spinner'

export const TextSubmitButton = withFormStatus(
  withProps(
    TextButton,
    ({ status, disabled, className, ...props }: ComponentProps<typeof TextButton> & { status: FormStatus }) => {
      return getPendingProps({ pending: status.pending, disabled, className, ...props })
    }
  )
)

export const TextPendingButton = withProps(
  TextButton,
  ({ pending, disabled, className, ...props }: ComponentProps<typeof TextButton> & { pending: boolean }) => {
    return getPendingProps({ pending, disabled, className, ...props })
  }
)

function getPendingProps ({ pending, disabled, className, ...props }: ComponentProps<typeof TextButton> & { pending: boolean }) {
  return {
    ...props,
    disabled: disabled ?? pending,
    className: cn(
      pending && 'disabled pointer-events-none dark:text-gray-400',
      className
    ),
    children: <BuildChildren pending={pending}>{props.children}</BuildChildren>
  }
}

function BuildChildren ({
  pending,
  children
}: {
  pending: boolean
  children: ReactNode
}) {
  return (
    <>
      {pending && <Spinner />}
      {children}
    </>
  )
}
