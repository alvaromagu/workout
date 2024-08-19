import Link from 'next/link'

export default function ExercisesLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className='mt-2'>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises'>
              Exercises
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href='/exercises/new'>
              New Exercise
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
