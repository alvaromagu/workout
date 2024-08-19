import { type ScrapedExercise } from '@/exercise/domain/types/scraped-exercise'
import { readFile } from 'node:fs/promises'

export const scrapedExercises = readFile('./public/exercise-info.json', 'utf-8').then(JSON.parse).then<ScrapedExercise[]>((baseExercises: any) => {
  return baseExercises.map((baseExercise: any) => {
    const exercises = baseExercise.exercises ?? []
    const translation = exercises.find(({ language }: any) => language === 2) ?? exercises[0]
    if (translation == null) {
      return null
    }
    return {
      id: baseExercise.id,
      name: translation.name,
      description: translation.description,
      muscles: (baseExercise.muscles ?? []).map((muscle: any) => ({
        id: muscle.id,
        name: muscle.name
      })),
      images: (baseExercise.images ?? []).map((image: any) => ({
        id: image.id,
        src: image.image
      })),
      videos: (baseExercise.videos ?? []).map((video: any) => ({
        id: video.id,
        src: video.video
      }))
    } satisfies ScrapedExercise
  }).filter(Boolean)
})
