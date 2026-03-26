import { type JSX, Suspense, useState } from 'react'
import { Chip, Dropdown, toast, useOverlayState } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Edit, FolderPlus, MoreVertical, Trash } from 'lucide-react'

import TagItem from '../../tags/components/TagItem'
import BookmarkService from '../services/bookmarkService'
import type { BookmarkListItem } from '../types/boomark.type'
import AssignCollectionModal from './AssignCollectionModal'
import BookmarkCopyButton from './BookmarkCopyButton'
import BookmarkFavoriteButton from './BookmarkFavoriteButton'
import BookmarkOpenButton from './BookmarkOpenButton'
import UpdateBookmarkModal from './UpdateBookmarkModal'
interface BookmarkCardProps {
  bookmark: BookmarkListItem
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps): JSX.Element => {
  const queryClient = useQueryClient()

  const editOverlay = useOverlayState()
  const assignOverlay = useOverlayState()
  const [isFavorite, setIsFavorite] = useState<boolean>(bookmark.isFavorite)
  const [accessCount, setAccessCount] = useState<number>(bookmark.accessCount)

  const formattedLastAccessedAt = bookmark.lastAccessedAt
    ? formatDistanceToNow(bookmark.lastAccessedAt, { addSuffix: true, locale: es })
    : 'Nunca'

  const handleToggleFavorite = async (): Promise<void> => {
    const previousState = isFavorite
    setIsFavorite(!isFavorite)
    try {
      if (previousState) {
        await BookmarkService.unmarkAsFavorite(bookmark.id)
        toast.success('Marcador eliminado de favoritos')
      } else {
        await BookmarkService.markAsFavorite(bookmark.id)
        toast.success('Marcador añadido a favoritos')
      }
    } catch (error) {
      setIsFavorite(previousState)
      toast.danger('Error al actualizar el estado de favorito')
      console.error('Error al cambiar el estado de favorito:', error)
    }
  }

  const handleCopy = (): void => {
    navigator.clipboard.writeText(bookmark.url)
    toast.success('URL copiada al portapapeles')
  }

  const deleteBookmarkMutation = useMutation({
    mutationFn: () => BookmarkService.delete(bookmark.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    },
  })

  const handleDelete = async (): Promise<void> => {
    toast.promise(deleteBookmarkMutation.mutateAsync(), {
      loading: 'Eliminando marcador...',
      success: 'Marcador eliminado con éxito',
      error: 'Error al eliminar marcador',
    })
  }

  const handleOpen = async (): Promise<void> => {
    window.open(bookmark.url, '_blank')
    try {
      setAccessCount(accessCount + 1)
      await BookmarkService.registerAccess(bookmark.id)
    } catch (error) {
      setAccessCount(accessCount - 1)
      console.error('Error al registrar el acceso:', error)
    }
  }

  const handleEdit = (): void => {
    editOverlay.open()
  }

  return (
    <div className='rounded-md shadow-sm border border-divider w-full transition-colors bg-content2/10 hover:bg-content2/30 px-4 py-4 dark:bg-neutral-900'>
      <div className='flex items-center gap-4'>
        <div className='flex-shrink-0'>
          <img
            src={bookmark.faviconUrl ?? '/favicon.ico'}
            alt={bookmark.domain}
            className='size-10 rounded'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between'>
            <div className='flex-1 min-w-0'>
              <h3 className='font-medium text-foreground truncate'>{bookmark.title}</h3>
              <div className='flex items-center gap-4 mt-1'>
                <span className='text-sm text-neutral-400 font-semibold'>{bookmark.domain}</span>
                {accessCount > 0 && (
                  <span className='text-sm text-neutral-400'>
                    {accessCount} {accessCount === 1 ? 'acceso' : 'accesos'}
                  </span>
                )}
                {accessCount === 0 && <span className='text-sm text-neutral-400'>Nunca</span>}
                {accessCount > 0 && (
                  <span className='text-sm text-neutral-400 first-letter:uppercase'>
                    {formattedLastAccessedAt}
                  </span>
                )}
              </div>
              <div className='flex items-center gap-2 mt-2'>
                {bookmark.tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} />
                ))}
                {bookmark.tags.length === 0 && (
                  <Chip className='bg-neutral-500 dark:bg-neutral-700 font-semibold text-white text-xs'>
                    Sin etiquetas
                  </Chip>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className='flex items-center gap-3 flex-shrink-0'>
          <BookmarkFavoriteButton isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />
          <BookmarkCopyButton onCopy={handleCopy} />
          <BookmarkOpenButton onOpen={handleOpen} />
          <Dropdown>
            <Dropdown.Trigger>
              <button
                className='group p-0 bg-transparent border-none outline-none cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-95'
                aria-label='Open actions menu'
              >
                <MoreVertical className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover placement='bottom end'>
              <Dropdown.Menu
                aria-label='Acciones de marcador'
                onAction={(key) => {
                  if (key === 'assign_collection') assignOverlay.open()
                  if (key === 'edit') handleEdit()
                  if (key === 'delete') handleDelete()
                }}
              >
                <Dropdown.Item id='assign_collection' textValue='Mover a colección'>
                  <div className='flex gap-2 items-center text-neutral-400'>
                    <FolderPlus className='size-4' />
                    <span>Mover a colección</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id='edit' textValue='Editar'>
                  <div className='flex gap-2 items-center text-neutral-400'>
                    <Edit className='size-4' />
                    <span>Editar</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id='delete' textValue='Eliminar' variant='danger'>
                  <div className='flex gap-2 items-center'>
                    <Trash className='size-4' />
                    <span>Eliminar</span>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        <Suspense fallback={null}>
          <UpdateBookmarkModal
            isOpen={editOverlay.isOpen}
            onOpenChange={editOverlay.toggle}
            bookmark={bookmark}
            initialTitle={bookmark.title}
          />
          <AssignCollectionModal
            isOpen={assignOverlay.isOpen}
            onOpenChange={assignOverlay.toggle}
            bookmark={bookmark}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default BookmarkCard
