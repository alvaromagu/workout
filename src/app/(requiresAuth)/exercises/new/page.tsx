import { ExerciseForm } from '@/exercise/infra/components/exercise-form'

export default function NewExercisePage () {
  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>New Exercise</h1>
      <ExerciseForm />
    </div>
  )
}
