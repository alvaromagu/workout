export type Paginated<T> = {
  results: T[]
  total: number
  page: number
  nextUrl: string | null
  prevUrl: string | null
}