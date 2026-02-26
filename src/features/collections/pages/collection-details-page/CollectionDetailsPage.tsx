import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, useDisclosure } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Settings } from 'lucide-react'

import BookmarkCard from '../../../bookmarks/components/BookmarkCard'
import BookmarkFilters from '../../../bookmarks/components/BookmarkFilters'
import BookmarkService from '../../../bookmarks/services/bookmarkService'
import type { BookmarkListItem } from '../../../bookmarks/types/boomark.type'
import TagService from '../../../tags/services/tagService'
import UpdateCollectionModal from '../../components/UpdateCollectionModal'
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
        <Button
          color='primary'
          variant='flat'
          className='ml-4'
          onPress={() => navigate('/collections')}
        >
          Volver a Colecciones
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6 w-full max-w-5xl mx-auto'>
      <div className='flex items-start gap-4'>
        <Button
          isIconOnly
          variant='light'
          className='mt-1 text-neutral-500 hover:text-foreground'
          onPress={() => navigate('/collections')}
          aria-label='Volver'
        >
          <ArrowLeft className='size-5' />
        </Button>
        <div className='flex-1 flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold tracking-tight'>{collection.name}</h2>
            <Button
              size='sm'
              variant='flat'
              color='default'
              startContent={<Settings className='size-4' />}
              onPress={onUpdateOpen}
            >
              Configurar
            </Button>
          </div>
          {collection.description && (
            <p className='text-neutral-500 text-sm mt-1 max-w-3xl'>{collection.description}</p>
          )}
        </div>
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
        <div className='py-16 text-center text-neutral-500 bg-content1/10 rounded-2xl border border-dashed border-divider'>
          <p className='text-lg mb-2'>No hay marcadores en esta colección.</p>
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
