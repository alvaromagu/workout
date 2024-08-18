'use client'

import { IconTrash } from '@tabler/icons-react'
import { useFormState } from 'react-dom'
import { deleteExerciseAction } from '../actions/delete-exercise-action'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { IconSubmitButton } from '@/commons/infra/components/client-button'

export function DeleteExerciseForm ({
  exerciseId
}: {
  exerciseId: string
}) {
  const router = useRouter()
  const [state, action] = useFormState(deleteExerciseAction.bind(undefined, exerciseId), undefined)

  useEffect(() => {
    if (state == null) return
    if (state.type === 'error') {
      toast.error(state.message)
    }
    if (state.type === 'success') {
      toast.success('Exercise deleted successfully')
      router.refresh()
    }
  }, [state, router])

  return (
    <form action={action}>
      <IconSubmitButton spinnerClassName='size-[18px]' className='dark:hover:bg-red-500'>
        <IconTrash size={18} />
      </IconSubmitButton>
    </form>
  )
}
