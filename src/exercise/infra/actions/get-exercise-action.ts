'use server'

import { type Primitives } from '@/commons/domain/types/to-primitives'
import { type Exercise } from '@/exercise/domain/types/exercise'
import { exerciseRepo } from '@/server-container'
import { notFound } from 'next/navigation'

export async function getExerciseAction (id: string): Promise<Primitives<Exercise>> {
  const exercise = await exerciseRepo.get(id)
  if (exercise == null) notFound()
  return exercise.toPrimitives()
}
