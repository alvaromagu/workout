import { Paginated } from "@/exercise/infra/types/paginated"
import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query"


type Props = {
  queryKey: UseInfiniteQueryOptions['queryKey'],
  api: string,
  limit: number
}

export function usePagination<T> ({
  api,
  queryKey,
  limit
}: Props) {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey,
    staleTime: Infinity,
    gcTime: Infinity,
    initialPageParam: `${api}?limit=${limit}&offset=0`,
    queryFn: async ({
      pageParam
    }) => {
      const res = await fetch(pageParam)
        .then<Paginated<T>>(res => res.json())
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