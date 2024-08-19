import Link from 'next/link'

export default function Home () {
  return (
    <div className='p-2'>
      <nav>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/scraped-exercises'>
              Scraped Data
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises'>
              Exercises
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
