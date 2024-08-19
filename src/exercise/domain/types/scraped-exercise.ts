export interface ScrapedExercise {
  id: number
  name: string
  description: string
  muscles: Array<{
    id: number
    name: string
  }>
  images: Array<{
    id: number
    src: string
  }>
  videos: Array<{
    id: number
    src: string
  }>
}
