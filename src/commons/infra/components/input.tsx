import { cn } from '@/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input (props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={
          cn(
            'rounded px-2 py-1 border border-transparent focus:outline-none dark:bg-zinc-900 dark:invalid:border-red-400 dark:valid:border-green-500',
            props.className
          )
        }
      />
    )
  }
)
