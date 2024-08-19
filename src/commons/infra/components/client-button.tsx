'use client'

import { withFormStatus } from '@/client-utils'
import { IconButton, TextButton } from './button'
import { cn, withProps } from '@/utils'
import { type FormStatus } from 'react-dom'
import { type ComponentProps, type ReactNode } from 'react'
import { Spinner } from './spinner'

export const IconSubmitButton = withFormStatus(
  withProps(
    IconButton,
    ({ status, disabled, className, spinnerClassName, ...props }: ComponentProps<typeof IconButton> & { status: FormStatus } & { spinnerClassName?: string }) => {
      return getIconPendingProps({ pending: status.pending, disabled, className, spinnerClassName, ...props })
    }
  )
)

export function getIconPendingProps ({ pending, disabled, className, spinnerClassName, ...props }: ComponentProps<typeof IconButton> & { pending: boolean, spinnerClassName?: string }) {
  return {
    ...props,
    disabled: disabled ?? pending,
    className: cn(
      pending && 'disabled pointer-events-none',
      className
    ),
    children: <BuildIconChildren spinnerClassName={spinnerClassName} pending={pending}>{props.children}</BuildIconChildren>
  }
}

function BuildIconChildren ({ pending, children, spinnerClassName }: { pending: boolean, children: ReactNode, spinnerClassName?: string }) {
  return (
    <>{pending ? <Spinner className={spinnerClassName} /> : children}</>
  )
}

export const TextSubmitButton = withFormStatus(
  withProps(
    TextButton,
    ({ status, disabled, className, ...props }: ComponentProps<typeof TextButton> & { status: FormStatus }) => {
      return getTextPendingProps({ pending: status.pending, disabled, className, ...props })
    }
  )
)

export const TextPendingButton = withProps(
  TextButton,
  ({ pending, disabled, className, ...props }: ComponentProps<typeof TextButton> & { pending: boolean }) => {
    return getTextPendingProps({ pending, disabled, className, ...props })
  }
)

function getTextPendingProps ({ pending, disabled, className, ...props }: ComponentProps<typeof TextButton> & { pending: boolean }) {
  return {
    ...props,
    disabled: disabled ?? pending,
    className: cn(
      pending && 'disabled pointer-events-none dark:text-gray-400',
      className
    ),
    children: <BuildTextChildren pending={pending}>{props.children}</BuildTextChildren>
  }
}

function BuildTextChildren ({
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
