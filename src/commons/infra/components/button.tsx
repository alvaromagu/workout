import { cn, withProps } from '@/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button (props, ref) {
    console.log(props.className)
    return (
      <button
        ref={ref}
        {...props}
        className={
          cn(
            'px-2 py-1 rounded transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800',
            props.className
          )
        }
      />
    )
  }
)

export const LabelButton = withProps(
  Button,
  props => ({ ...props, className: cn('flex items-center justify-center gap-2 p-2', props.className) })
)

export const IconButton = withProps(
  Button,
  props => ({ ...props, className: cn('flex items-center justify-center rounded-full p-2', props.className) })
)
