import { ExerciseForm } from '@/exercise/infra/components/exercise-form'

export default function FromScrapPage ({
  searchParams
}: {
  searchParams: {
    name?: string
    description?: string
    muscles?: string
    image?: string
  }
}) {
  const normalizedObject = {
    name: searchParams.name,
    description: searchParams.description,
    muscles: searchParams.muscles,
    image: searchParams.image
  }

  return (
    <div className='p-2'>
      <h1 className='text-2xl mb-4'>From Scrap Page</h1>
      <ExerciseForm exercise={normalizedObject} />
    </div>
  )
}
