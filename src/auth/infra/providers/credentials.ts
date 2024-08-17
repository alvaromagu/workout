import Credentials from 'next-auth/providers/credentials'
import { InvalidCredentials } from '../exceptions/invalid-credentials'

export const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {}
  },
  authorize: async (credentials) => {
    const user = await fetch('http://localhost:3000/api/credentials/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(async res => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new InvalidCredentials()
        }
        throw new Error('Failed to login')
      }
      return await res.json()
    })
    return user
  }
})
