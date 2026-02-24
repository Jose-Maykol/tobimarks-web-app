import { useState } from 'react'
import { Button, Chip, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Edit2, Trash2 } from 'lucide-react'

import { COLORS_MAP } from '../constants/tagColors'
import type { TagListItem } from '../types/tags.type'

interface ManageTagChipProps {
  tag: TagListItem
  onEdit: (tag: TagListItem) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

const ManageTagChip = ({ tag, onEdit, onDelete, isDeleting }: ManageTagChipProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleDeleteConfirm = () => {
    onDelete(tag.id)
    setIsPopoverOpen(false)
  }

  return (
    <div className='group relative inline-flex items-center rounded-md'>
      <Chip
        className={`${COLORS_MAP[tag.color].background} shrink-0`}
        classNames={{ content: 'font-semibold text-white text-xs' }}
        radius='md'
      >
        {tag.name}
      </Chip>

      <div className='flex items-center gap-1 overflow-hidden transition-all duration-300 w-0 opacity-0 group-hover:w-[60px] group-hover:opacity-100 group-hover:ml-1'>
        <Button
          isIconOnly
          size='sm'
          variant='flat'
          color='primary'
          onPress={() => onEdit(tag)}
          aria-label='Editar tag'
          className='w-7 h-7 min-w-7 rounded-md shadow-sm'
        >
          <Edit2 size={14} />
        </Button>

        <Popover
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          placement='bottom-end'
          showArrow
        >
          <PopoverTrigger>
            <Button
              isIconOnly
              size='sm'
              variant='flat'
              color='danger'
              aria-label='Eliminar tag'
              className='w-7 h-7 min-w-7 rounded-md shadow-sm'
            >
              <Trash2 size={14} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='px-1 py-2'>
              <div className='text-small font-bold mb-2'>¿Eliminar tag?</div>
              <div className='text-tiny mb-4 text-default-500'>
                Esta acción no se puede deshacer.
              </div>
              <div className='flex gap-2 justify-end'>
                <Button size='sm' variant='flat' onPress={() => setIsPopoverOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  size='sm'
                  color='danger'
                  variant='flat'
                  isLoading={isDeleting}
                  onPress={handleDeleteConfirm}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default ManageTagChip
