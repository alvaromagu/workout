import type en from './messages/en.json'
import type { DefaultSession } from 'next-auth'

type Messages = typeof en

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages { }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userId: string
  }
}
