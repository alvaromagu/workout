import { type ScrapedExercise } from '../types/scraped-exercise'

export interface ScrapedExerciseRepository {
  getScrapedExercise: (id: number) => Promise<ScrapedExercise | null>
  getScrapedExercises: () => Promise<ScrapedExercise[]>
}
