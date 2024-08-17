import { authThr } from '@/auth/infra/actions/auth-thr'
import { ClientSignOut } from '@/auth/infra/components/client-sign-out'
import { type Session } from 'next-auth'
import Link from 'next/link'

export default async function RequiresAuthLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await authThr()

  return (
    <>
      <Header session={session} />
      <main>
        {children}
      </main>
    </>
  )
}

function Header ({
  session
}: {
  session: Session
}) {
  return (
    <header className='flex items-center sticky top-0 gap-2 p-2 dark:bg-zinc-900 z-50'>
      <Link href='/' className='flex gap-2 items-center px-2 py-1 rounded transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'>
        <img
          src={session.user?.image ?? 'https://avatar.iran.liara.run/public'}
          alt={session.user?.name ?? 'random avatar'}
          className='size-8 rounded-full object-cover'
        />
        <p className='text-xl'>{session.user?.name}</p>
      </Link>
      <div className='flex justify-end items-center flex-1'>
        <ClientSignOut />
      </div>
    </header>
  )
}
