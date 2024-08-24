'use client'

import { Spinner } from '@/commons/infra/components/spinner'
import { useIntersection } from '@/commons/infra/hooks/use-intersection'
import { usePagination } from '@/commons/infra/hooks/use-pagination'
import { ScrapedExercise } from '@/exercise/domain/types/scraped-exercise'
import { ScrapedExerciseList } from '@/exercise/infra/components/scraped-exercise-list'
import { useRef } from 'react'

const API_URL = '/api/exercises/scraped'
const LIMIT = 1

export default function ScrapedExercisesPage() {
  const lastItemRef = useRef<HTMLLIElement>(null)
  const { data, isLoading, isFetching, fetchNextPage } = usePagination<ScrapedExercise>({
    api: API_URL,
    queryKey: ['scraped-exercises'],
    limit: LIMIT
  })

  useIntersection(
    lastItemRef,
    fetchNextPage,
    { observe: !isFetching }
  )

  return (
    <>
      <div className='flex mt-2 justify-center'>
        {isLoading && <Spinner />}
      </div>
      <ScrapedExerciseList lastItemRef={lastItemRef} scrapedExercises={data ?? []} />
      <div className='flex mt-2 justify-center'>
        {isFetching && !isLoading && <Spinner className='mt-2' />}
      </div>
    </>
  )
}
