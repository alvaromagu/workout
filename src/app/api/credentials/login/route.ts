import { credentialUserFinder } from '@/server-container'

export async function POST (request: Request) {
  const json = await request.json() as { email: string, password: string }
  const credentialUser = await credentialUserFinder.findByCredentials({
    email: json.email,
    password: json.password
  })
  if (credentialUser == null) {
    return new Response('Unauthorized', { status: 401 })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...credentialUserWithoutPassword } = credentialUser.toPrimitives()
  return new Response(JSON.stringify(credentialUserWithoutPassword), {
    headers: { 'Content-Type': 'application/json' }
  })
}
