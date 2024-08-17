import { clsx, type ClassValue } from 'clsx'
import {
  forwardRef,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type RefAttributes
} from 'react'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withForwardRefProps<T extends object, P extends object> (
  Component: ForwardRefExoticComponent<P & RefAttributes<T>>,
  baseProps: P | ((props: P) => P)
) {
  // eslint-disable-next-line react/display-name
  return forwardRef<T, P>((props, ref) => {
    const finalProps = typeof baseProps === 'function' ? baseProps(props) : { ...baseProps, ...props }
    return (
      <Component {...finalProps} {...props} ref={ref} />
    )
  })
}

export function withProps<T extends object, U = T> (
  Component: FunctionComponent<T>,
  baseProps: T | ((props: U) => T)
) {
  // eslint-disable-next-line react/display-name
  return (props: U) => {
    const finalProps = typeof baseProps === 'function' ? baseProps(props) : { ...baseProps, ...props }

    return (
      <Component {...finalProps} />
    )
  }
}
