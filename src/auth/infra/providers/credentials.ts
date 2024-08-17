import Credentials from 'next-auth/providers/credentials'

export const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {}
  },
  authorize: async (credentials) => {
    const credentialUser = await fetch('http://localhost:3000/api/credentials/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(async res => {
      if (!res.ok) {
        console.log('Failed to login', res.statusText)
        throw new Error(res.statusText)
      }
      return await res.json()
    })
    if (credentialUser == null) {
      return null
    }
    return credentialUser
  }
})
