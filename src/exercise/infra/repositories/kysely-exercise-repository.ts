import { Repository } from '@/commons/infra/db/kysely-pg/repository'
import { type ExerciseRepository } from '@/exercise/domain/repositories/exercise-repository'
import { Exercise } from '@/exercise/domain/types/exercise'

export class KyselyExerciseRepository extends Repository implements ExerciseRepository {
  async create (exercise: Exercise): Promise<Exercise> {
    await this.db
      .insertInto('exercise')
      .values(exercise.toPrimitives())
      .execute()
    return exercise
  }

  async get (id: string): Promise<Exercise | null> {
    const exercise = await this.db
      .selectFrom('exercise')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()
    if (exercise == null) {
      return null
    }
    return new Exercise(
      exercise.id,
      exercise.name,
      exercise.description,
      exercise.muscles,
      exercise.image
    )
  }

  async update (exercise: Exercise): Promise<Exercise> {
    const { id, ...rest } = exercise.toPrimitives()
    await this.db
      .updateTable('exercise')
      .set(rest)
      .where('id', '=', id)
      .execute()
    return exercise
  }

  async delete (id: string): Promise<void> {
    await this.db
      .deleteFrom('exercise')
      .where('id', '=', id)
      .execute()
  }

  async getAll (): Promise<Exercise[]> {
    return await this.db
      .selectFrom('exercise')
      .selectAll()
      .execute()
      .then((exercises) => exercises.map((exercise) => new Exercise(
        exercise.id,
        exercise.name,
        exercise.description,
        exercise.muscles,
        exercise.image
      )))
  }
}
