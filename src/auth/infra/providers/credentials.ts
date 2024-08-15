import { userFinder } from '@/server-container'
import Credentials from 'next-auth/providers/credentials'

export const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {}
  },
  authorize: async (credentials) => {
    const user = await userFinder.findByCredentials({
      email: credentials.email as string,
      password: credentials.password as string
    })
    if (user == null) {
      console.log('User not found')
      return null
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }
})