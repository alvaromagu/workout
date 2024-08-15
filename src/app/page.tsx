import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home-page')
  return (
    <h1 className='text-xl'>
      {t('hello-world')}
    </h1>
  )
}
