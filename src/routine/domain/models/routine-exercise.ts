import { type BaseModel } from '@/commons/domain/models/base-model'
import { type Primitives } from '@/commons/domain/types/to-primitives'

function validateId (id: unknown) {
  if (typeof id !== 'string') {
    throw new Error('Invalid id')
  }
}

function validateSteps (targetSteps: unknown) {
  if (typeof targetSteps !== 'number') {
    throw new Error('Invalid steps')
  }
  if (isNaN(targetSteps)) {
    throw new Error('Invalid steps')
  }
  if (targetSteps < 1) {
    throw new Error('Steps too low')
  }
}

function validateReps (targetReps: unknown) {
  if (typeof targetReps !== 'number') {
    throw new Error('Invalid reps')
  }
  if (isNaN(targetReps)) {
    throw new Error('Invalid steps')
  }
  if (targetReps < 1) {
    throw new Error('Reps too low')
  }
}

export class RoutineExercise implements BaseModel<RoutineExercise> {
  constructor (
    public readonly id: string,
    public readonly routineId: string,
    public readonly exerciseId: string,
    public readonly targetSteps: number,
    public readonly targetReps: number
  ) {
    validateId(id)
    validateId(routineId)
    validateId(exerciseId)
    validateSteps(targetSteps)
    validateReps(targetReps)
  }

  toPrimitives (): Primitives<RoutineExercise> {
    return {
      id: this.id,
      routineId: this.routineId,
      exerciseId: this.exerciseId,
      targetSteps: this.targetSteps,
      targetReps: this.targetReps
    }
  }
}
