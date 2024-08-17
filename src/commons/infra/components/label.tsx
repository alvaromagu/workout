import { cn } from '@/utils'
import { forwardRef, type LabelHTMLAttributes } from 'react'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label (props, ref) {
    return (
      <label
        ref={ref}
        {...props}
        className={cn('flex flex-col', props.className)}
      />
    )
  }
)
