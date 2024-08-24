import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function RoutinesLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const t = useTranslations()
  return (
    <>
      <nav className='mt-2'>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/routines'>
              {t('routines.routines')}
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/routines/new'>
              {t('routines.new-routine')}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
