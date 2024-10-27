import { type RefObject, useEffect } from 'react'

type Options = IntersectionObserverInit & { observe: boolean }

export function useIntersection (
  element: RefObject<HTMLElement>,
  cb: () => void,
  options: Options = { observe: true, rootMargin: '0px' }
) {
  useEffect(() => {
    if (!options.observe) return
    const current = element.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cb()
      }
    }, options)
    if (current != null) {
      observer.observe(current)
    }
    return () => {
      if (current != null) {
        observer.unobserve(current)
      }
    }
  }, [element, cb, options])
}
