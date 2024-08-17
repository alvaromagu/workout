import { useTranslations } from 'next-intl'

export default function Home () {
  const t = useTranslations()

  return (
    <h1 className='text-xl'>
      {t('home-page.hello-world')}
    </h1>
  )
}
