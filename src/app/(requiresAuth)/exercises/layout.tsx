import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function ExercisesLayout ({
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
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises'>
              {t('home-page.exercises')}
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises/new'>
              {t('exercises.new-exercise')}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
