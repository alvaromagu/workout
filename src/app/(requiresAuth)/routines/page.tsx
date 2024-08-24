import { useTranslations } from 'next-intl'

export default function RoutinesPage () {
  const t = useTranslations()
  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>
        {t('routines.routines')}
      </h1>
    </div>
  )
}
