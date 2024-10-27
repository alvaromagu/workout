'use client'

import { IconButton } from '@/commons/infra/components/button'
import { IconTrash } from '@tabler/icons-react'
import { deleteRoutineExerciseAction } from '../actions/delete-routine-exercise-action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function DeleteRoutineExerciseButton ({
  routineExerciseId
}: {
  routineExerciseId: string
}) {
  const router = useRouter()

  return (
    <IconButton onClick={async () => {
      const state = await deleteRoutineExerciseAction(routineExerciseId)
      if (state == null) return
      if (state.type === 'error') {
        toast.error(state.message)
      }
      if (state.type === 'success') {
        toast.success('Routine deleted successfully')
        router.refresh()
      }
    }} type='button' className='dark:hover:bg-red-500'>
      <IconTrash size={18} />
    </IconButton>
  )
}
