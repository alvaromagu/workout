import { type Paginated } from '@/exercise/infra/types/paginated'
import { useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query'

interface Props {
  queryKey: UseInfiniteQueryOptions['queryKey']
  api: string
  limit: number
  intialPageParam?: string
}

export function usePagination<T> ({
  api,
  queryKey,
  limit,
  intialPageParam
}: Props) {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey,
    staleTime: Infinity,
    gcTime: Infinity,
    initialPageParam: intialPageParam ?? `${api}?limit=${limit}&offset=0`,
    queryFn: async ({
      pageParam
    }) => {
      const res = await fetch(pageParam)
        .then<Paginated<T>>(async res => await res.json())
      return res
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextUrl
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.prevUrl
    },
    select: (data) => {
      return data.pages.flatMap(page => page.results)
    }
  })

  return {
    data,
    isLoading,
    isFetching,
    fetchNextPage
  }
}
