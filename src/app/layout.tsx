import '@/app/globals.css'

import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import { RootProviders } from '@/app/providers'
import { cn } from '@/utils'

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

  return (
    <html lang={locale}>
      <body className={cn(onest.className, 'max-w-2xl m-auto dark:bg-zinc-950')}>
        <RootProviders>
          <main>
            {children}
          </main>
        </RootProviders>
      </body>
    </html>
  )
}
