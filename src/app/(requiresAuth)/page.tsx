import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home () {
  const t = useTranslations()

  return (
    <div className='p-2'>
      <nav>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/scraped-exercises'>
              {t('home-page.scrapped-data')}
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises'>
              {t('home-page.exercises')}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
