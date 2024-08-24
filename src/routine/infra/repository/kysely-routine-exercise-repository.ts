import { Repository } from "@/commons/infra/db/kysely-pg/repository";
import { RoutineExercise } from "@/routine/domain/models/routine-exercise";
import { RoutineExerciseRepository } from "@/routine/domain/repository/routine-exercise-repository";

export class KyselyRoutineExerciseRepository extends Repository implements RoutineExerciseRepository {
  private mapToDb(routineExercise:RoutineExercise) {
    return {
      id: routineExercise.id,
      routine_id: routineExercise.routineId,
      exercise_id: routineExercise.exerciseId,
      target_steps: routineExercise.targetSteps,
      target_reps: routineExercise.targetReps
    }    
  }

  async save(routineExercise: RoutineExercise): Promise<void> {
    this.db.insertInto('routine_exercise')
      .values(this.mapToDb(routineExercise))
      .execute()
  }

  async saveBatch(routineExercises: RoutineExercise[]): Promise<void> {
    this.db.insertInto('routine_exercise')
      .values(routineExercises.map(this.mapToDb))
      .execute()
  }

  async update(routineExercise: RoutineExercise): Promise<void> {
    this.db.updateTable('routine_exercise')
      .set(routineExercise.toPrimitives())
      .where('id', '=', routineExercise.id)
      .execute()
  }

  async delete(id: string): Promise<void> {
    this.db.deleteFrom('routine_exercise')
      .where('id', '=', id)
      .execute()
  }
}