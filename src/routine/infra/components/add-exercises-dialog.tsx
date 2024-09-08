'use client'

import { type Primitives } from '@/commons/domain/types/to-primitives'
import { IconButton, TextButton } from '@/commons/infra/components/button'
import { Dialog } from '@/commons/infra/components/dialog'
import { Input } from '@/commons/infra/components/input'
import { useDebounceValue } from '@/commons/infra/hooks/use-debounce'
import { usePagination } from '@/commons/infra/hooks/use-pagination'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'

const API_URL = '/api/exercises'
const LIMIT = 10

export function AddExercisesDialog () {
  const [search, setSearch] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const debouncedSearch = useDebounceValue(search, 500)

  const { data } = usePagination<Primitives<Exercise>>({
    api: API_URL,
    limit: LIMIT,
    queryKey: [API_URL, debouncedSearch],
    intialPageParam: `${API_URL}?limit=${LIMIT}&offset=0&q=${debouncedSearch}`
  })

  return (
    <>
      <TextButton onClick={() => {
        dialogRef.current?.showModal()
      }} className='dark:bg-zinc-950' type='button'>
        Add exercises
      </TextButton>
      <Dialog
        ref={dialogRef}
        className='bg-zinc-950 shadow-2xl rounded backdrop:bg-zinc-900 backdrop:opacity-95 backdrop:blur-sm border dark:border-zinc-800'
      >
        <header className='p-2 flex gap-2 justify-between items-center bg-zinc-900'>
          <h2>Add exercises dialog</h2>
          <IconButton
            className='hover:text-red-400'
            onClick={() => {
              dialogRef.current?.close()
            }}
          >
            <IconX size={15} />
          </IconButton>
        </header>
        <form className='p-2'>
          <Input onChange={e => { setSearch(e.target.value) }} type='search' placeholder='Search for an exercise...' />
        </form>
        <ul>
          {data?.map(exercise => (
            <li key={exercise.id}>
              <p>{exercise.name}</p>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  )
}
