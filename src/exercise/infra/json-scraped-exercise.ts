import { scrapedExercises } from './data/scraped-exercises'
import { type ScrapedExerciseRepository } from '../domain/repositories/scraped-exercise-repository'
import { type ScrapedExercise } from '../domain/types/scraped-exercise'

export class JsonScrapedExerciseRepository implements ScrapedExerciseRepository {
  async count (): Promise<number> {
    return await scrapedExercises.then((scrapedExercises) => scrapedExercises.length)
  }

  async getScrapedExercises ({
    limit,
    offset
  }: {
    limit: number
    offset: number
  } = {
    limit: 20,
    offset: 0
  }): Promise<ScrapedExercise[]> {
    return await scrapedExercises.then((scrapedExercises) => scrapedExercises.slice(offset, offset + limit))
  }
}
