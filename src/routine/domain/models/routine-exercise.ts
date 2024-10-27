import { type BaseModel } from '@/commons/domain/models/base-model'
import { type Primitives } from '@/commons/domain/types/to-primitives'

function validateId (id: unknown) {
  if (typeof id !== 'string') {
    throw new Error('Invalid id')
  }
}

function validateSteps (targetSteps: unknown) {
  if (targetSteps == null) {
    return
  }
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
  if (targetReps == null) {
    return
  }
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

function validateType (type: unknown) {
  if (type !== 'steps-reps' && type !== 'time') {
    throw new Error('Invalid type')
  }
}

// hh:mm:ss (if h, m or s is 0, cant be omitted)
const timeRegex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/

function validateTargetTime (time: unknown) {
  console.log(typeof time)
  if (time == null) {
    return
  }
  if (typeof time !== 'string') {
    throw new Error('Invalid time')
  }
  if (!timeRegex.test(time)) {
    throw new Error('Invalid time')
  }
}

function validateTargets (type: RoutineExerciseType, targetSteps: number | null, targetTime: string | null) {
  if (type === 'steps-reps' && (targetSteps == null)) { // tagetReps is not required
    throw new Error('With steps-reps type, targetSteps is required')
  }
  if (type === 'time' && targetTime == null) {
    throw new Error('With time type, targetTime is required')
  }
  // min time is 00:00:01 so we check if time is 00:00:00
  if (targetTime === '00:00:00') {
    throw new Error('Time must be greater than 00:00:00')
  }
}

export type RoutineExerciseType = 'steps-reps' | 'time'

export class RoutineExercise implements BaseModel<RoutineExercise> {
  constructor (
    public readonly id: string,
    public readonly routineId: string,
    public readonly exerciseId: string,
    public readonly targetSteps: number | null,
    public readonly targetReps: number | null,
    public readonly type: RoutineExerciseType,
    public readonly targetTime: string | null
  ) {
    validateId(id)
    validateId(routineId)
    validateId(exerciseId)
    validateSteps(targetSteps)
    validateReps(targetReps)
    validateType(type)
    validateTargetTime(targetTime)
    validateTargets(type, targetSteps, targetTime)
  }

  toPrimitives (): Primitives<RoutineExercise> {
    return {
      id: this.id,
      routineId: this.routineId,
      exerciseId: this.exerciseId,
      targetSteps: this.targetSteps,
      targetReps: this.targetReps,
      type: this.type,
      targetTime: this.targetTime
    }
  }
}
