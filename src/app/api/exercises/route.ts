import { type Primitives } from '@/commons/domain/types/to-primitives'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { type Paginated } from '@/exercise/infra/types/paginated'
import { exerciseRepo } from '@/server-container'
import { type NextRequest } from 'next/server'

function isEmpty (value: unknown): boolean {
  return value == null || value === ''
}

function validateNumber (value: unknown): number | false {
  if (isEmpty(value)) return false
  const num = Number(value)
  return Number.isInteger(num) && num >= 0 ? num : false
}

function normalizeQ (value: string): string | undefined {
  return value == null ? undefined : value.trim()
}

export async function GET (request: NextRequest) {
  const obj = Object.fromEntries(request.nextUrl.searchParams.entries())
  const q = normalizeQ(obj.q)
  const offset = validateNumber(obj.offset)
  const limit = validateNumber(obj.limit)
  if (offset === false || limit === false) {
    return new Response('Invalid query parameters', { status: 400 })
  }
  const { results, total } = await exerciseRepo.paginate({ offset, limit, q })
  const nextOffset = offset + limit
  const hasNext = nextOffset < total
  const nextUrl = new URL(request.nextUrl.href)
  nextUrl.searchParams.set('offset', String(nextOffset))
  const prevOffset = offset - limit
  const hasPrev = prevOffset >= 0
  const prevUrl = new URL(request.nextUrl.href)
  prevUrl.searchParams.set('offset', String(prevOffset))
  const page = Math.floor(offset / limit)
  const res: Paginated<Primitives<Exercise>> = {
    total,
    nextUrl: hasNext ? nextUrl.toString() : null,
    prevUrl: hasPrev ? prevUrl.toString() : null,
    page,
    results: results.map(exercise => exercise.toPrimitives())
  }
  return new Response(JSON.stringify(res), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
