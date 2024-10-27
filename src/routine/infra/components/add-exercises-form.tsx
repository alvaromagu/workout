'use client'

import { IconButton, TextButton } from '@/commons/infra/components/button'
import { Input } from '@/commons/infra/components/input'
import { Label } from '@/commons/infra/components/label'
import { Spinner } from '@/commons/infra/components/spinner'
import { useDebounceValue } from '@/commons/infra/hooks/use-debounce'
import { useIntersection } from '@/commons/infra/hooks/use-intersection'
import { usePagination } from '@/commons/infra/hooks/use-pagination'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { ExerciseItem } from '@/exercise/infra/components/exercise-item'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { createRoutineExerciseAction } from '../actions/create-routine-exercise-action'
import { useFormState } from 'react-dom'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import { type RoutineExercisePopulatedPrimitives } from '@/routine/domain/types/routine-exercise-populated'
import { type Primitives } from '@/commons/domain/types/to-primitives'
import { type RoutineExercise } from '@/routine/domain/models/routine-exercise'
import { updateRoutineExerciseAction } from '../actions/edit-routine-exercise-action'

type StepState =
  { stepName: 'select-exercise' }
  | { stepName: 'routine-config', exercise: Primitives<Exercise> }

export function AddExerciesForm ({
  routineId,
  routineExercise
}: {
  routineId: string
  routineExercise?: RoutineExercisePopulatedPrimitives
}) {
  const [step, setStep] = useState<StepState>(() => {
    if (routineExercise == null) {
      return { stepName: 'select-exercise' }
    }
    return { stepName: 'routine-config', exercise: routineExercise.exercise }
  })

  function handleSelectExercise (exercise: Primitives<Exercise>) {
    setStep({ stepName: 'routine-config', exercise })
  }

  return (
    <div>
      <header className='flex justify-between items-center mb-2'>
        <h2 className='text-xl'>
          {step.stepName}
        </h2>
        {step.stepName !== 'select-exercise' && (
          <TextButton onClick={() => {
            setStep({ stepName: 'select-exercise' })
          }}>
            Change exercise <IconArrowLeft />
          </TextButton>
        )}
      </header>
      {step.stepName === 'select-exercise' && <ExerciseSelector onSelectExercise={handleSelectExercise} />}
      {step.stepName === 'routine-config' && <RoutineConfig exercise={step.exercise} routineId={routineId} routineExercise={routineExercise?.routineExercise} />}
    </div>
  )
}

const API_URL = '/api/exercises'
const LIMIT = 10

function ExerciseSelector ({
  onSelectExercise
}: {
  onSelectExercise: (exercise: Primitives<Exercise>) => void
}) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounceValue(search, 500)
  const lastItemRef = useRef<HTMLLIElement>(null)
  const { data, isLoading, isFetching, fetchNextPage } = usePagination<Primitives<Exercise>>({
    api: API_URL,
    queryKey: ['exercises', debouncedSearch],
    intialPageParam: `${API_URL}?limit=${LIMIT}&offset=0&q=${debouncedSearch}`,
    limit: LIMIT
  })

  useIntersection(
    lastItemRef,
    fetchNextPage,
    { observe: !isFetching }
  )

  return (
    <>
      <search>
        <Label>
          Search
          <Input type='search' placeholder='Search exercises' value={search} onChange={(e) => {
            setSearch(e.target.value)
          }} />
        </Label>
      </search>
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
  exercises: Array<Primitives<Exercise>>
  lastItemRef: RefObject<HTMLLIElement>
  onSelectExercise: (exercise: Primitives<Exercise>) => void
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
  exercise,
  routineId,
  routineExercise
}: {
  exercise: Primitives<Exercise>
  routineId: string
  routineExercise?: Primitives<RoutineExercise>
}) {
  const isEdit = routineExercise != null
  const [state, action] = useFormState(
    isEdit
      ? updateRoutineExerciseAction.bind(null, { routineId, routineExerciseId: routineExercise.id, exerciseId: exercise.id })
      : createRoutineExerciseAction.bind(null, { routineId, exerciseId: exercise.id }),
    undefined
  )

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') toast.error(state.message)
    if (state.type === 'success') {
      toast.success('Exercise added/updated to routine successfully')
      redirect(`/routines/${routineId}/edit`)
    }
  }, [state, routineId])

  return (
    <>
      <ExerciseItem exercise={exercise} />
      <form action={action} className='flex flex-col gap-2 mt-2'>
        <Label>
          Target steps
          <Input
            type='number'
            min={1}
            required
            placeholder='Target steps'
            name='sets'
            defaultValue={routineExercise?.targetSteps}
          />
        </Label>
        <Label>
          Target reps
          <Input
            type='number'
            min={1}
            required
            placeholder='Target reps'
            name='reps'
            defaultValue={routineExercise?.targetReps}
          />
        </Label>
        <TextButton type='submit' className='mt-2'>
          {isEdit ? 'Update' : 'Add'} exercise
        </TextButton>
      </form>
    </>
  )
}
