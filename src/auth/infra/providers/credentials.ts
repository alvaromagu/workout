import Credentials from 'next-auth/providers/credentials'

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
    }).then(res => {
      if (!res.ok) {
        console.log('Failed to login', res.statusText)
        throw new Error(res.statusText)
      }
      return res.json()
    })
    console.log('Login success', user)
    if (user == null) {
      console.log('User not found')
      return null
    }
    return user
  }
})