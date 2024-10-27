'use client'

import { type DialogHTMLAttributes, forwardRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type Props = DialogHTMLAttributes<HTMLDialogElement>

export const Dialog = forwardRef<HTMLDialogElement, Props>(function Dialog (props, ref) {
  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    targetRef.current = document.body
  }, [])

  return targetRef.current == null
    ? null
    : createPortal(
      <dialog ref={ref} {...props} />,
      targetRef.current
    )
})
