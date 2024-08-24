import { NextRequest } from "next/server";
import { scrapedExerciseRepo } from '@/server-container'
import { Paginated } from "@/exercise/infra/types/paginated";
import { ScrapedExercise } from "@/exercise/domain/types/scraped-exercise";

function isEmpty (value: unknown): boolean {
  return value == null || value === ''
}

function validateNumber (value: unknown): number | false {
  if (isEmpty(value)) return false
  const num = Number(value)
  return Number.isInteger(num) && num >= 0 ? num : false
}

export async function GET (request: NextRequest) {
  const obj = Object.fromEntries(request.nextUrl.searchParams.entries())
  const offset = validateNumber(obj.offset)
  const limit = validateNumber(obj.limit)
  if (offset === false || limit === false) {
    return new Response('Invalid query parameters', { status: 400 })
  }
  const [exercises, count] = await Promise.all([
    scrapedExerciseRepo.getScrapedExercises({offset, limit}),
    scrapedExerciseRepo.count()
  ])
  const nextOffset = offset + limit
  const hasNext = nextOffset < count
  const nextUrl = new URL(request.nextUrl.href)
  nextUrl.searchParams.set('offset', String(nextOffset))
  const prevOffset = offset - limit
  const hasPrev = prevOffset >= 0
  const prevUrl = new URL(request.nextUrl.href)
  prevUrl.searchParams.set('offset', String(prevOffset))
  const page = Math.floor(offset / limit)
  const res: Paginated<ScrapedExercise> = {
    total: count,
    nextUrl: hasNext ? nextUrl.toString() : null,
    prevUrl: hasPrev ? prevUrl.toString() : null,
    page,
    results: exercises,
  }
  return new Response(JSON.stringify(res), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}