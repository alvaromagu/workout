import { type ScrapedExercise } from '../types/scraped-exercise'

export interface ScrapedExerciseRepository {
  count: () => Promise<number>
  getScrapedExercises: () => Promise<ScrapedExercise[]>
}
