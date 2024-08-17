import { cn } from '@/utils'

export function Spinner ({
  className
}: {
  className?: string
}) {
  return (
    <span className={cn(
      'animate-spin size-4 border-2 border-transparent border-t-2 border-t-blue-500 border-l-blue-500 rounded-full',
      className
    )} />
  )
}
