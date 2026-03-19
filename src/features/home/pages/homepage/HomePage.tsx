import { useQuery } from '@tanstack/react-query'
import { Bookmark, Folder, Tag } from 'lucide-react'

import StatisticsService from '../../../statistics/services/statisticsService'

const HomePage = () => {
  const {
    data: summary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['statistics', 'summary'],
    queryFn: StatisticsService.getSummary,
  })

  return (
    <div className='flex flex-col gap-6 w-full max-w-5xl mx-auto'>
      <div className='flex flex-col gap-1 mb-2'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground'>Dashboard</h2>
        <p className='text-neutral-500 text-sm'>
          Un resumen general de tu contenido y actividad en Tobimarks.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {/* Total Bookmarks Card */}
        <div className='flex flex-col p-5 bg-content1 border border-divider rounded-md shadow-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-neutral-500'>Marcadores Totales</span>
            <div className='p-2 bg-primary/10 text-primary rounded-sm'>
              <Bookmark className='size-4' strokeWidth={2} />
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            {isLoading ? (
              <div className='h-8 w-16 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-sm' />
            ) : isError ? (
              <span className='text-danger text-sm'>Error</span>
            ) : (
              <span className='text-3xl font-bold text-foreground'>
                {summary?.totalBookmarks || 0}
              </span>
            )}
          </div>
        </div>

        {/* Total Collections Card */}
        <div className='flex flex-col p-5 bg-content1 border border-divider rounded-md shadow-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-neutral-500'>Colecciones</span>
            <div className='p-2 bg-blue-500/10 text-blue-500 rounded-sm'>
              <Folder className='size-4' strokeWidth={2} />
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            {isLoading ? (
              <div className='h-8 w-16 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-sm' />
            ) : isError ? (
              <span className='text-danger text-sm'>Error</span>
            ) : (
              <span className='text-3xl font-bold text-foreground'>
                {summary?.totalCollections || 0}
              </span>
            )}
          </div>
        </div>

        {/* Total Tags Card */}
        <div className='flex flex-col p-5 bg-content1 border border-divider rounded-md shadow-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-neutral-500'>Etiquetas</span>
            <div className='p-2 bg-amber-500/10 text-amber-500 rounded-sm'>
              <Tag className='size-4' strokeWidth={2} />
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            {isLoading ? (
              <div className='h-8 w-16 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-sm' />
            ) : isError ? (
              <span className='text-danger text-sm'>Error</span>
            ) : (
              <span className='text-3xl font-bold text-foreground'>{summary?.totalTags || 0}</span>
            )}
          </div>
        </div>
      </div>

      {/* 
        Aquí en el futuro se pueden añadir más secciones, 
        como actividad reciente o marcadores destacados.
      */}
    </div>
  )
}

export default HomePage
