import { Repository } from '@/commons/infra/db/kysely-pg/repository'
import { Exercise } from '@/exercise/domain/types/exercise'
import { RoutineExercise } from '@/routine/domain/models/routine-exercise'
import { type RoutineExerciseRepository } from '@/routine/domain/repository/routine-exercise-repository'
import { type RoutineExercisePopulated } from '@/routine/domain/types/routine-exercise-populated'

export class KyselyRoutineExerciseRepository extends Repository implements RoutineExerciseRepository {
  private mapToDb (routineExercise: RoutineExercise) {
    return {
      id: routineExercise.id,
      routine_id: routineExercise.routineId,
      exercise_id: routineExercise.exerciseId,
      target_steps: routineExercise.targetSteps,
      target_reps: routineExercise.targetReps
    }
  }

  async save (routineExercise: RoutineExercise): Promise<void> {
    await this.db.insertInto('routine_exercise')
      .values(this.mapToDb(routineExercise))
      .execute()
  }

  async saveBatch (routineExercises: RoutineExercise[]): Promise<void> {
    await this.db.insertInto('routine_exercise')
      .values(routineExercises.map(this.mapToDb.bind(this)))
      .execute()
  }

  async update (routineExercise: RoutineExercise): Promise<void> {
    await this.db.updateTable('routine_exercise')
      .set(routineExercise.toPrimitives())
      .where('id', '=', routineExercise.id)
      .execute()
  }

  async delete (id: string): Promise<void> {
    await this.db.deleteFrom('routine_exercise')
      .where('id', '=', id)
      .execute()
  }

  async getPopulatedByRoutineId (routineId: string): Promise<RoutineExercisePopulated[]> {
    const rows = await this.db.selectFrom('routine_exercise')
      .where('routine_id', '=', routineId)
      .innerJoin('exercise', 'exercise.id', 'routine_exercise.exercise_id')
      .select([
        'routine_exercise.id as routine_exercise_id',
        'routine_exercise.routine_id as routine_id',
        'routine_exercise.exercise_id as exercise_id',
        'routine_exercise.target_steps as target_steps',
        'routine_exercise.target_reps as target_reps',
        'exercise.name as exercise_name',
        'exercise.description as exercise_description',
        'exercise.image as exercise_image',
        'exercise.muscles as exercise_muscles'
      ])
      .execute()
    return rows.map(row => {
      return {
        routineExercise: new RoutineExercise(
          row.routine_exercise_id,
          row.routine_id,
          row.exercise_id,
          row.target_steps,
          row.target_reps
        ),
        exercise: new Exercise(
          row.exercise_id,
          row.exercise_name,
          row.exercise_description,
          row.exercise_muscles,
          row.exercise_image
        )
      }
    })
  }
}
