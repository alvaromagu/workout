'use server'

import { type Primitives } from '@/commons/domain/types/to-primitives'
import { type Routine } from '@/routine/domain/models/routine'
import { routinesRepo } from '@/server-container'
import { notFound } from 'next/navigation'

export async function getRoutineAction (id: string): Promise<Primitives<Routine>> {
  const routine = await routinesRepo.get(id)
  if (routine == null) notFound()
  return routine.toPrimitives()
}
