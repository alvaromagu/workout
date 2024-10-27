import { RoutineForm } from '@/routine/infra/components/routine-form'
import { useTranslations } from 'next-intl'

export default function NewRoutinePage () {
  const t = useTranslations()

  return (
    <div className='p-2'>
      <h1 className='text-2xl'>
        {t('routines.new-routine')}
      </h1>
      <div className='mt-4'>
        <RoutineForm />
      </div>
    </div>
  )
}
