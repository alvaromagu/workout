import { getRoutineAction } from '@/routine/infra/actions/get-routine-action'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function RoutineLayout ({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    id: string
  }
}) {
  const t = await getTranslations()
  const routine = await getRoutineAction(params.id)

  return (
    <>
      <h2 className='text-center text-xl mt-2'>
        ({routine.name})
      </h2>
      <nav>
        <ul className='flex gap-2 justify-center'>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href={`/routines/${params.id}/edit`}>
              {t('routines.update')}
            </Link>
          </li>
          <li>
            <Link className='underline transition-colors hover:text-blue-500' href={`/routines/${params.id}/add-exercises`}>
              {t('routines.add-exercises')}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </>
  )
}
