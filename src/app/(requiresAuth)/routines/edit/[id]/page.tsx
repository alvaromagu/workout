import { getRoutineAction } from '@/routine/infra/actions/get-routine-action'
import { RoutineForm } from '@/routine/infra/components/routine-form'
import { getTranslations } from 'next-intl/server'

export default async function EditPage ({
  params
}: {
  params: {
    id: string
  }
}) {
  const routine = await getRoutineAction(params.id)
  const t = await getTranslations()

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>
        {t('exercises.edit-exercise')}
      </h1>
      <RoutineForm routine={routine} />
    </div>
  )
}
