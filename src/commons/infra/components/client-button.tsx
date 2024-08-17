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
      return {
        ...props,
        disabled: disabled ?? status.pending,
        className: cn(
          status.pending && 'disabled pointer-events-none dark:text-gray-400',
          className
        ),
        children: <BuildChildren status={status}>{props.children}</BuildChildren>
      }
    }
  )
)

function BuildChildren ({
  status,
  children
}: {
  status: FormStatus
  children: ReactNode
}) {
  return (
    <>
      {status.pending && <Spinner />}
      {children}
    </>
  )
}
