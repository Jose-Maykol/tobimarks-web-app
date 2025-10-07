import { type JSX, Suspense } from 'react'
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@heroui/react'
import { Copy, Edit, ExternalLink, Heart, MoreVertical, Trash } from 'lucide-react'

import TagItem from '../../tags/components/TagItem'
import type { BookmarkListItem } from '../types/boomark.type'
import UpdateBookmarkModal from './UpdateBookmarkModal'

interface BookmarkCardProps {
  bookmark: BookmarkListItem
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps): JSX.Element => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleLike = (): void => {
    console.log('Like bookmark', bookmark.id)
  }

  const handleCopy = (): void => {
    navigator.clipboard.writeText(bookmark.url)
  }

  const handleOpen = (): void => {
    window.open(bookmark.url, '_blank')
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
                  <span className='text-sm text-muted-foreground'>{bookmark.domain}</span>
                  <span className='text-sm text-neutral-400'>{bookmark.accessCount} accesos</span>
                  <span className='text-sm text-neutral-400'>Nunca</span>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  {bookmark.tags.map((tag) => (
                    <TagItem key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className='flex items-center gap-2 flex-shrink-0'>
            <Button size='sm' variant='light' isIconOnly onPress={handleLike}>
              <Heart className='size-4' />
            </Button>
            <Button size='sm' variant='light' isIconOnly onPress={handleCopy}>
              <Copy className='size-4' />
            </Button>
            <Button size='sm' variant='light' isIconOnly onPress={handleOpen}>
              <ExternalLink className='size-4' />
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button size='sm' variant='light' isIconOnly>
                  <MoreVertical className='size-4' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant='flat'>
                <DropdownItem
                  key='edit'
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
