import { scrapedExercises } from './data/scraped-exercises'
import { type ScrapedExerciseRepository } from '../domain/repositories/scraped-exercise-repository'
import { type ScrapedExercise } from '../domain/types/scraped-exercise'

export class JsonScrapedExerciseRepository implements ScrapedExerciseRepository {
  async getScrapedExercise (id: number): Promise<ScrapedExercise | null> {
    return await scrapedExercises.then((scrapedExercise) => scrapedExercise.find((exercise) => exercise.id === id) ?? null)
  }

  async getScrapedExercises (): Promise<ScrapedExercise[]> {
    return await scrapedExercises
  }
}
