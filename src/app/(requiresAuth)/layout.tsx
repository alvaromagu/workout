import { authThr } from '@/auth/infra/actions/auth-thr'
import { ClientSignOut } from '@/auth/infra/components/client-sign-out'
import { type Session } from 'next-auth'

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
    <header className='flex items-center sticky top-0 gap-2 p-2 bg-zinc-900'>
      <img
        src={session.user?.image ?? 'https://avatar.iran.liara.run/public'}
        alt={session.user?.name ?? 'random avatar'}
        className='size-8 rounded-full object-cover'
      />
      <p className='text-xl'>{session.user?.name}</p>
      <div className='flex justify-end items-center flex-1'>
        <ClientSignOut />
      </div>
    </header>
  )
}
