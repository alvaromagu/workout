'use server'

import { exerciseRepo } from '@/server-container'

export async function listExerciseAction () {
  return await exerciseRepo.getAll()
}
