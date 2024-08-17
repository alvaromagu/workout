import { userFinder } from '@/server-container'

export async function POST (request: Request) {
  const json = await request.json() as { email: string, password: string }
  const user = await userFinder.findByCredentials({
    email: json.email,
    password: json.password
  })
  if (user == null) {
    return new Response('Unauthorized', { status: 401 })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user.toPrimitives()
  return new Response(JSON.stringify(userWithoutPassword), {
    headers: { 'Content-Type': 'application/json' }
  })
}
