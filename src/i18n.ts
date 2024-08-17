import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

type Locale = 'en' | 'es'
const defaultLocale: Locale = 'en'
const locales = new Set<Locale>(['en', 'es'])

const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g
function getReqLocale (): Locale {
  const acceptLang = headers().get('accept-language')
  const matches = acceptLang?.match(regex) ?? []
  let firstValid: Locale | undefined
  for (const match of matches) {
    if (match == null || match.trim() === '') continue
    const [locale] = match.split(';')
    if (locale == null) continue
    const [code] = locale.split('-') as [Locale]
    if (locales.has(code)) {
      firstValid = code
      break
    }
  }
  return firstValid ?? defaultLocale
}

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = getReqLocale()
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
