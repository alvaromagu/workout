import { authThr } from '@/auth/infra/actions/auth-thr'
import { DeleteRoutineForm } from '@/routine/infra/components/delete-routine-form'
import { routinesRepo } from '@/server-container'
import { IconEdit } from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function RoutinesPage () {
  const t = await getTranslations()
  const userId = (await authThr()).userId
  const routines = await routinesRepo.paginated({ offset: 0, limit: 100, userId })

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>
        {t('routines.routines')}
      </h1>
      <ul>
        {routines.results.map(routine => (
          <li key={routine.id} className='mb-2'>
            <article className='flex items-center gap-2 dark:bg-zinc-900 rounded p-2'>
              <div className='flex-1'>
                <h2>
                  {routine.name}
                </h2>
              </div>
              <Link
                href={`/routines/edit/${routine.id}`}
                className='flex items-center justify-center rounded-full p-2 transition-colors dark:hover:bg-zinc-800 dark:border dark:border-zinc-800'
              >
                <IconEdit size={18} />
              </Link>
              <DeleteRoutineForm routineId={routine.id} />
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
