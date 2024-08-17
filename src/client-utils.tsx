import { type FunctionComponent } from 'react'
import { type FormStatus, useFormStatus } from 'react-dom'

export function withFormStatus<T extends object> (
  Component: FunctionComponent<T & { status: FormStatus }>
): FunctionComponent<T> {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    const status = useFormStatus()
    return (
      <Component {...props} status={status} />
    )
  }
}
