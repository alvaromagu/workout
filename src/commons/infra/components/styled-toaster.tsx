import { Toaster } from 'react-hot-toast'

export function StyledToaster () {
  return (
    <Toaster
      toastOptions={{
        className: 'dark:!border dark:!border-gray-700 dark:!text-white dark:!bg-zinc-950'
      }}
    />
  )
}
