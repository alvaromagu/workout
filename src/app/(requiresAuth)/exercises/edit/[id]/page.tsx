import { getExerciseAction } from '@/exercise/infra/actions/get-exercise-action'
import { ExerciseForm } from '@/exercise/infra/components/exercise-form'

export default async function EditPage ({
  params
}: {
  params: {
    id: string
  }
}) {
  const exercise = await getExerciseAction(params.id)

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>Edit exercise</h1>
      <ExerciseForm exercise={exercise} />
    </div>
  )
}
