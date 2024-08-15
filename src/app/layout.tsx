import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import './globals.css'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

const onest = Onest({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workout App',
  description: 'Workout App',
  icons: [
    {
      media: '(prefers-color-scheme: dark)',
      url: '/favdark.svg',
    },
    {
      media: '(prefers-color-scheme: light)',
      url: '/favlight.svg',
    },
  ]
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={onest.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
