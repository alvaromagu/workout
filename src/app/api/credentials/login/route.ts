import { userFinder } from '@/server-container'

export async function POST(request:Request) {
  const json = await request.json() as { email: string, password: string }
  const user = await userFinder.findByCredentials({
    email: json.email as string,
    password: json.password as string
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user ?? {}
  return new Response(JSON.stringify(userWithoutPassword), {
    headers: { 'Content-Type': 'application/json' },
  })
}