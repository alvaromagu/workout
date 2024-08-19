export type UpdateCreateExerciseActionState = {
  type: 'error'
  message: string
} | {
  type: 'success'
} | undefined
