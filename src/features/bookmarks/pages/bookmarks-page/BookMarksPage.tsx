import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import TagService from '../../../tags/services/tagService'
import BookmarkCard from '../../components/BookmarkCard'
import BookmarkFilters from '../../components/BookmarkFilters'
import BookmarkService from '../../services/bookmarkService'

const BookmarksPage = () => {
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false)
  const [sortBy, setSortBy] = useState<'createdAt' | 'lastAccessedAt' | 'accessCount'>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [accessedWithin, setAccessedWithin] = useState<'week' | 'month' | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    initialData: [],
  })

  const {
    data: bookmarks = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      'bookmarks',
      { isFavorite: isFavoriteFilter, tags: selectedTags, sortBy, sortDirection, accessedWithin },
    ],
    queryFn: () =>
      BookmarkService.getList({
        isFavorite: isFavoriteFilter ? true : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        sortBy: sortBy === 'createdAt' && sortDirection === 'desc' ? undefined : sortBy,
        sortDirection:
          sortBy === 'createdAt' && sortDirection === 'desc' ? undefined : sortDirection,
        accessedWithin: accessedWithin === 'all' ? undefined : accessedWithin,
      }),
    initialData: [],
  })

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const clearFilters = () => {
    setIsFavoriteFilter(false)
    setSortBy('createdAt')
    setSortDirection('desc')
    setAccessedWithin('all')
    setSelectedTags([])
  }

  const hasActiveFilters =
    isFavoriteFilter ||
    selectedTags.length > 0 ||
    sortBy !== 'createdAt' ||
    sortDirection !== 'desc' ||
    accessedWithin !== 'all'

  if (isLoading)
    return <div className='p-8 text-center text-neutral-400'>Cargando marcadores...</div>
  if (isError) return <div className='p-8 text-danger'>Error: {(error as Error).message}</div>

  return (
    <div className='flex flex-col gap-6 w-full max-w-5xl mx-auto'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl font-bold tracking-tight'>Tus marcadores</h2>

        <BookmarkFilters
          tags={tags}
          selectedTags={selectedTags}
          onTagSelectionChange={toggleTag}
          isFavoriteFilter={isFavoriteFilter}
          onFavoriteFilterChange={setIsFavoriteFilter}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(newSortBy, newSortDirection) => {
            setSortBy(newSortBy)
            setSortDirection(newSortDirection)
          }}
          accessedWithin={accessedWithin}
          onAccessedWithinChange={(val) => setAccessedWithin(val)}
          onClearFilters={clearFilters}
        />
      </div>

      {isFetching && !isLoading && (
        <div className='text-xs text-primary animate-pulse w-full text-center'>
          Actualizando lista...
        </div>
      )}

      {bookmarks.length === 0 && !isLoading && !isFetching ? (
        <div className='py-16 text-center text-neutral-500 bg-content1/10 rounded-2xl border border-dashed border-divider'>
          <p className='text-lg mb-2'>No se encontraron marcadores.</p>
          {hasActiveFilters && <p className='text-sm'>Intenta ajustar o limpiar los filtros.</p>}
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BookmarksPage
