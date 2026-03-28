import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@heroui/react'
import { useDisclosure } from '@heroui/use-disclosure'
import { useQuery } from '@tanstack/react-query'
import { Settings } from 'lucide-react'

import BookmarkCard from '../../../bookmarks/components/BookmarkCard'
import BookmarkFilters from '../../../bookmarks/components/BookmarkFilters'
import BookmarkService from '../../../bookmarks/services/bookmarkService'
import type { BookmarkListItem } from '../../../bookmarks/types/boomark.type'
import TagService from '../../../tags/services/tagService'
import UpdateCollectionModal from '../../components/UpdateCollectionModal'
import { COLLECTION_COLORS, COLLECTION_ICONS } from '../../constants/collectionVisuals'
import CollectionService from '../../services/collectionService'

const CollectionDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()

  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false)
  const [sortBy, setSortBy] = useState<'createdAt' | 'lastAccessedAt' | 'accessCount'>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [accessedWithin, setAccessedWithin] = useState<'week' | 'month' | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { data: collection, isLoading: isLoadingCollection } = useQuery({
    queryKey: ['collections', id],
    queryFn: () => CollectionService.getById(id!),
    enabled: !!id,
  })

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    initialData: [],
  })

  const {
    data: bookmarks = [],
    isLoading: isLoadingBookmarks,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      'bookmarks',
      {
        collectionId: id,
        isFavorite: isFavoriteFilter,
        tags: selectedTags,
        sortBy,
        sortDirection,
        accessedWithin,
      },
    ],
    queryFn: () =>
      BookmarkService.getList({
        collectionId: id,
        isFavorite: isFavoriteFilter ? true : undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        sortBy: sortBy === 'createdAt' && sortDirection === 'desc' ? undefined : sortBy,
        sortDirection:
          sortBy === 'createdAt' && sortDirection === 'desc' ? undefined : sortDirection,
        accessedWithin: accessedWithin === 'all' ? undefined : accessedWithin,
      }),
    initialData: [],
    enabled: !!id,
  })

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
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

  if (isLoadingCollection && !collection) {
    return <div className='p-8 text-center text-neutral-400'>Cargando colección...</div>
  }

  if (!collection) {
    return (
      <div className='p-8 text-center text-neutral-400'>
        Colección no encontrada.
        <Button variant='primary' className='ml-4' onPress={() => navigate('/collections')}>
          Volver a Colecciones
        </Button>
      </div>
    )
  }

  const Icon = COLLECTION_ICONS[collection.icon || 'folder']
  const colorScheme = COLLECTION_COLORS[collection.color || 'blue']

  return (
    <div className='flex flex-col gap-6 w-full max-w-5xl mx-auto'>
      <div className='flex flex-col mb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-center gap-5'>
            <div
              className={`w-16 h-16 rounded-md ${colorScheme.lightBg} border border-divider flex items-center justify-center ${colorScheme.text} shadow-sm`}
            >
              <Icon className='size-8' strokeWidth={1.5} />
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground'>
                {collection.name || 'Colección'}
              </h1>
              <div className='flex flex-wrap items-center gap-3 text-sm'>
                <div className='px-2.5 py-1 rounded-sm bg-content1 border border-divider text-foreground/80 font-medium flex items-center gap-2 shadow-sm'>
                  <span className={`w-1.5 h-1.5 rounded-full ${colorScheme.bg}`}></span>
                  {collection.bookmarksCount}{' '}
                  {collection.bookmarksCount === 1 ? 'marcador' : 'marcadores'}
                </div>
                {collection.updatedAt && !isNaN(collection.updatedAt.getTime()) && (
                  <>
                    <span className='text-neutral-600'>•</span>
                    <span className='text-neutral-500 font-medium'>
                      Actualizado el {collection.updatedAt.toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            variant='outline'
            className='font-medium shadow-sm lg:mt-2 rounded-md'
            onPress={onUpdateOpen}
          >
            <Settings className='size-4 text-neutral-500' />
            Configurar
          </Button>
        </div>

        {collection.description && (
          <p className='text-neutral-500 text-base mt-6 max-w-3xl leading-relaxed'>
            {collection.description}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-4 mt-2'>
        <BookmarkFilters
          tags={tags}
          selectedTags={selectedTags}
          onTagSelectionChange={toggleTag}
          isFavoriteFilter={isFavoriteFilter}
          onFavoriteFilterChange={setIsFavoriteFilter}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={(
            newSortBy: 'createdAt' | 'lastAccessedAt' | 'accessCount',
            newSortDirection: 'asc' | 'desc'
          ) => {
            setSortBy(newSortBy)
            setSortDirection(newSortDirection)
          }}
          accessedWithin={accessedWithin}
          onAccessedWithinChange={(val: 'week' | 'month' | 'all') => setAccessedWithin(val)}
          onClearFilters={clearFilters}
        />
      </div>

      {isFetching && !isLoadingBookmarks && (
        <div className='text-xs text-primary animate-pulse w-full text-center'>
          Actualizando lista...
        </div>
      )}

      {isLoadingBookmarks ? (
        <div className='p-8 text-center text-neutral-400'>Cargando marcadores...</div>
      ) : isError ? (
        <div className='p-8 text-danger'>Error: {(error as Error).message}</div>
      ) : bookmarks.length === 0 && !isFetching ? (
        <div className='py-16 text-center text-neutral-500 bg-content1/10 rounded-md border border-dashed border-divider'>
          <p className='text-md mb-2'>No hay marcadores en esta colección.</p>
          {hasActiveFilters && <p className='text-sm'>Intenta ajustar o limpiar los filtros.</p>}
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {bookmarks.map((bookmark: BookmarkListItem) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}

      <UpdateCollectionModal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        collection={collection}
      />
    </div>
  )
}

export default CollectionDetailsPage
