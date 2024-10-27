import { type ScrapedExercise } from '@/exercise/domain/types/scraped-exercise'
import { cn } from '@/utils'
import Link from 'next/link'
import { type RefObject } from 'react'

export function ScrapedExerciseList ({
  scrapedExercises,
  lastItemRef
}: {
  scrapedExercises: ScrapedExercise[]
  lastItemRef: RefObject<HTMLLIElement>
}) {
  return (
    <ul className='flex flex-col gap-2 p-2'>
      {scrapedExercises.map((baseExercise, i) => {
        const { name, description, muscles, images, videos } = baseExercise
        const searchParams = new URLSearchParams({
          name: name ?? '',
          description: description ?? '',
          muscles: muscles.map(muscle => muscle.name).join(', ') ?? '',
          image: images[0]?.src ?? ''
        })

        return (
          <li key={baseExercise.id} ref={i === scrapedExercises.length - 1 ? lastItemRef : undefined}>
            <article>
              <Link
                href={'/exercises/from-scrap?' + searchParams.toString()}
                className='block w-full p-2 shadow dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors overflow-hidden rounded'
              >
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
                      <li key={muscle.id} className='lowercase py-1 px-3 rounded-xl dark:bg-zinc-800 text-sm'>
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
              </Link>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
