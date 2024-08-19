import { type ScrapedExercise } from '@/exercise/domain/types/scraped-exercise'

export const scrapedExercises =
  fetch('https://gist.githubusercontent.com/alvaromagu/91863b6cd1dfd831a31099d840359b8a/raw/25d0227fcc442df3cbd015be5494bfeb78509ca6/exercise-info.json', {
    cache: 'no-store'
  }).then(async res => await res.json()).then<ScrapedExercise[]>((baseExercises: any) => {
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
