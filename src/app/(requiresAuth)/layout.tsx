import { authThr } from '@/auth/infra/actions/auth-thr'
import { ClientSignOut } from '@/auth/infra/components/client-sign-out'
import { Session } from 'next-auth'

export default async function RequiresAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
    <header className='flex items-center p-2'>
      <p className='text-xl'>Welcome {session.user?.name}</p>
      <div className='flex justify-end items-center flex-1'>
        <ClientSignOut />
      </div>
    </header>
  )
}
