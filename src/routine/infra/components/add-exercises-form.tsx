'use client'

import { IconButton } from '@/commons/infra/components/button'
import { Spinner } from '@/commons/infra/components/spinner'
import { useIntersection } from '@/commons/infra/hooks/use-intersection'
import { usePagination } from '@/commons/infra/hooks/use-pagination'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { ExerciseItem } from '@/exercise/infra/components/exercise-item'
import { IconArrowRight } from '@tabler/icons-react'
import { type RefObject, useRef, useState } from 'react'

type StepState =
  { stepName: 'select-exercise' }
  | { stepName: 'routine-config', exercise: Exercise }

export function AddExerciesForm ({
  routineId
}: {
  routineId: string
}) {
  const [step, setStep] = useState<StepState>({ stepName: 'select-exercise' })

  function handleSelectExercise (exercise: Exercise) {
    setStep({ stepName: 'routine-config', exercise })
  }

  return (
    <>
      {step.stepName === 'select-exercise' && <ExerciseSelector onSelectExercise={handleSelectExercise} />}
      {step.stepName === 'routine-config' && <RoutineConfig exercise={step.exercise} />}
    </>
  )
}

const API_URL = '/api/exercises'
const LIMIT = 10

function ExerciseSelector ({
  onSelectExercise
}: {
  onSelectExercise: (exercise: Exercise) => void
}) {
  const lastItemRef = useRef<HTMLLIElement>(null)
  const { data, isLoading, isFetching, fetchNextPage } = usePagination<Exercise>({
    api: API_URL,
    queryKey: ['exercises'],
    limit: LIMIT
  })

  useIntersection(
    lastItemRef,
    fetchNextPage,
    { observe: !isFetching }
  )

  return (
    <>
      <h2 className='text-xl'>Select an exercise</h2>
      <div className='flex mt-2 justify-center'>
        {isLoading && <Spinner />}
      </div>
      <SelectableExerciseList exercises={data ?? []} lastItemRef={lastItemRef} onSelectExercise={onSelectExercise} />
      <div className='flex mt-2 justify-center'>
        {isFetching && !isLoading && <Spinner className='mt-2' />}
      </div>
    </>
  )
}

function SelectableExerciseList ({
  exercises,
  lastItemRef,
  onSelectExercise
}: {
  exercises: Exercise[]
  lastItemRef: RefObject<HTMLLIElement>
  onSelectExercise: (exercise: Exercise) => void
}) {
  return (
    <ul className='flex flex-col gap-2 p-2'>
      {exercises.map((exercise, i) => {
        return (
          <li key={exercise.id} ref={i === exercises.length - 1 ? lastItemRef : undefined}>
            <ExerciseItem
              exercise={exercise}
              actions={(
                <IconButton className='hover:text-green-400' onClick={() => {
                  onSelectExercise(exercise)
                }}>
                  <IconArrowRight />
                </IconButton>
              )}
            />
          </li>
        )
      })}
    </ul>
  )
}

function RoutineConfig ({
  exercise
}: {
  exercise: Exercise
}) {
  return (
    <>
      <h2 className='text-xl mb-2'>Configure the exercise</h2>
      <ExerciseItem exercise={exercise} />
    </>
  )
}
