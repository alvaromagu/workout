import { scrapedExerciseRepo } from '@/server-container'
import { cn } from '@/utils'

export default async function ScrapedExercisesPage () {
  const json = await scrapedExerciseRepo.getScrapedExercises()

  return (
    <ul className='flex flex-col gap-2 p-2'>
      {json.map(baseExercise => {
        const { name, description, muscles, images, videos } = baseExercise

        return (
          <li key={baseExercise.id}>
            <article className='p-2 shadow bg-zinc-900 overflow-hidden rounded'>
              <h2>{name}</h2>
              <div className={cn(
                'text-xs'
              )} dangerouslySetInnerHTML={{ __html: description }} />
              {muscles.length > 0 && (
                <h3 className='mt-4'>Muscles</h3>
              )}
              <ul className='flex flex-wrap gap-2'>
                {muscles.map(muscle => {
                  return (
                    <li key={muscle.id} className='lowercase py-1 px-3 rounded-xl bg-zinc-800 text-sm'>
                      <h4>{muscle.name}</h4>
                    </li>
                  )
                })}
              </ul>
              {images.length > 0 && (
                <h3 className='mt-4'>Images</h3>
              )}
              <ul className='flex flex-wrap gap-2'>
                {images.map(image => {
                  return (
                    <li key={image.id}>
                      <img src={image.src} alt={name} className='w-auto max-w-24 object-cover rounded' />
                    </li>
                  )
                })}
              </ul>
              {videos.length > 0 && (
                <h3 className='mt-4'>Videos</h3>
              )}
              <ul className='flex flex-wrap gap-2'>
                {videos.map(video => {
                  return (
                    <li key={video.id}>
                      <video
                        src={video.src}
                        controls
                        className='w-full aspect-video object-cover rounded' />
                    </li>
                  )
                })}
              </ul>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
