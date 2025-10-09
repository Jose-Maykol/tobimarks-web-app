import { type JSX, Suspense, useState } from 'react'
import {
  addToast,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@heroui/react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Edit, MoreVertical, Trash } from 'lucide-react'

import TagItem from '../../tags/components/TagItem'
import BookmarkService from '../services/bookmarkService'
import type { BookmarkListItem } from '../types/boomark.type'
import BookmarkCopyButton from './BookmarkCopyButton'
import BookmarkFavoriteButton from './BookmarkFavoriteButton'
import BookmarkOpenButton from './BookmarkOpenButton'
import UpdateBookmarkModal from './UpdateBookmarkModal'
interface BookmarkCardProps {
  bookmark: BookmarkListItem
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
        addToast({ title: 'Marcador eliminado de favoritos', color: 'success' })
      } else {
        await BookmarkService.markAsFavorite(bookmark.id)
        addToast({ title: 'Marcador añadido a favoritos', color: 'success' })
      }
    } catch (error) {
      setIsFavorite(previousState)
      addToast({ title: 'Error al actualizar el estado de favorito', color: 'danger' })
      console.error('Error al cambiar el estado de favorito:', error)
    }
  }

  const handleCopy = (): void => {
    navigator.clipboard.writeText(bookmark.url)
    addToast({ title: 'URL copiada al portapapeles', color: 'success' })
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
    onOpen()
    console.log('Edit bookmark', bookmark.id)
  }

  const handleDelete = (): void => {
    console.log('Delete bookmark', bookmark.id)
  }

  return (
    <Card className='rounded-md w-full transition-colors px-4 dark:bg-neutral-900'>
      <CardBody className='p-4'>
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
                    <Chip
                      radius='md'
                      className='bg-neutral-500 dark:bg-neutral-700'
                      classNames={{ content: 'font-semibold text-white text-xs' }}
                    >
                      Sin etiquetas
                    </Chip>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            <BookmarkFavoriteButton
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
            <BookmarkCopyButton onCopy={handleCopy} />
            <BookmarkOpenButton onOpen={handleOpen} />
            <Dropdown>
              <DropdownTrigger>
                <button
                  className='group p-0 bg-transparent border-none outline-none cursor-pointer'
                  aria-label='Open actions menu'
                >
                  <MoreVertical className='size-4 transition-colors duration-150 text-neutral-400 dark:group-hover:text-neutral-50 group-hover:text-neutral-500' />
                </button>
              </DropdownTrigger>
              <DropdownMenu variant='flat'>
                <DropdownItem
                  key='edit'
                  className='text-neutral-400 data-[hover=true]:text-neutral-500 dark:data-[hover=true]:text-neutral-50'
                  onPress={handleEdit}
                  startContent={<Edit className='size-4' />}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  onPress={handleDelete}
                  startContent={<Trash className='size-4' />}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <Suspense fallback={null}>
            <UpdateBookmarkModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              bookmark={bookmark}
              initialTitle={bookmark.title}
            />
          </Suspense>
        </div>
      </CardBody>
    </Card>
  )
}

export default BookmarkCard
