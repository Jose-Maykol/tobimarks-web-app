import { Button } from '@heroui/react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { Folder, MoreVertical, Pencil, Trash } from 'lucide-react'

import type { Collection } from '../types/collection.type'

interface CollectionCardProps {
  collection: Collection
  onEdit: (collection: Collection) => void
  onDelete: (collection: Collection) => void
}

const CollectionCard = ({ collection, onEdit, onDelete }: CollectionCardProps) => {
  return (
    <div className='flex flex-col p-4 gap-3 bg-content1 hover:bg-content2/50 transition-colors border border-divider rounded-sm'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary/10 text-primary rounded-xl flex-shrink-0'>
            <Folder className='size-5' fill='currentColor' />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-foreground line-clamp-1'>{collection.name}</h3>
            <span className='text-xs text-neutral-500'>
              {collection.bookmarksCount}{' '}
              {collection.bookmarksCount === 1 ? 'marcador' : 'marcadores'}
            </span>
          </div>
        </div>

        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Button isIconOnly variant='light' size='sm' className='text-neutral-500'>
              <MoreVertical className='size-4' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Acciones de colección' variant='flat'>
            <DropdownItem
              key='edit'
              startContent={<Pencil className='size-4 text-neutral-500' />}
              onPress={() => onEdit(collection)}
            >
              Editar
            </DropdownItem>
            <DropdownItem
              key='delete'
              className='text-danger'
              color='danger'
              startContent={<Trash className='size-4 text-danger' />}
              onPress={() => onDelete(collection)}
            >
              Eliminar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {collection.description && (
        <p className='text-sm text-neutral-400 line-clamp-2 mt-1'>{collection.description}</p>
      )}

      <div className='text-[10px] text-neutral-500 mt-auto pt-2'>
        Actualizado {collection.updatedAt.toLocaleDateString()}
      </div>
    </div>
  )
}

export default CollectionCard
