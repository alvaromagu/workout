import { type RefObject, useEffect } from 'react'

type Options = IntersectionObserverInit & { observe: boolean }

export function useIntersection (
  element: RefObject<HTMLElement>,
  cb: () => void,
  options: Options = { observe: true, rootMargin: '0px' }
) {
  useEffect(() => {
    if (!options.observe) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cb()
      }
    }, options)
    if (element.current) {
      observer.observe(element.current)
    }
    return () => {
      if (element.current) {
        observer.unobserve(element.current)
      }
    }
  }, [element, cb, options])
}
