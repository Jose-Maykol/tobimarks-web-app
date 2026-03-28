import { Button, ListBox, Select } from '@heroui/react'
import { Heart, Tag as TagIcon, X } from 'lucide-react'

import { COLORS_MAP } from '../../tags/constants/tagColors'
import type { TagListItem } from '../../tags/types/tags.type'

interface BookmarkFiltersProps {
  tags: TagListItem[]
  selectedTags: string[]
  onTagSelectionChange: (tagId: string) => void
  isFavoriteFilter: boolean
  onFavoriteFilterChange: (isFavorite: boolean) => void
  sortBy: 'createdAt' | 'lastAccessedAt' | 'accessCount'
  sortDirection: 'asc' | 'desc'
  onSortChange: (
    sortBy: 'createdAt' | 'lastAccessedAt' | 'accessCount',
    sortDirection: 'asc' | 'desc'
  ) => void
  accessedWithin: 'week' | 'month' | 'all'
  onAccessedWithinChange: (accessedWithin: 'week' | 'month' | 'all') => void
  onClearFilters: () => void
}

const BookmarkFilters = ({
  tags,
  selectedTags,
  onTagSelectionChange,
  isFavoriteFilter,
  onFavoriteFilterChange,
  sortBy,
  sortDirection,
  onSortChange,
  accessedWithin,
  onAccessedWithinChange,
  onClearFilters,
}: BookmarkFiltersProps) => {
  const hasActiveFilters =
    isFavoriteFilter ||
    selectedTags.length > 0 ||
    sortBy !== 'createdAt' ||
    sortDirection !== 'desc' ||
    accessedWithin !== 'all'

  const handleSortSelection = (key: string) => {
    switch (key) {
      case 'recent':
        onSortChange('createdAt', 'desc')
        break
      case 'oldest':
        onSortChange('createdAt', 'asc')
        break
      case 'most-accessed':
        onSortChange('accessCount', 'desc')
        break
      case 'last-accessed':
        onSortChange('lastAccessedAt', 'desc')
        break
    }
  }

  const getSortSelectedKey = () => {
    if (sortBy === 'createdAt' && sortDirection === 'desc') return 'recent'
    if (sortBy === 'createdAt' && sortDirection === 'asc') return 'oldest'
    if (sortBy === 'accessCount' && sortDirection === 'desc') return 'most-accessed'
    if (sortBy === 'lastAccessedAt' && sortDirection === 'desc') return 'last-accessed'
    return 'recent'
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <Button
            size='sm'
            variant={isFavoriteFilter ? 'primary' : 'outline'}
            className={`h-9 px-3 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
              isFavoriteFilter
                ? 'bg-danger text-white shadow-sm hover:bg-danger/90 border-danger'
                : 'text-neutral-500 hover:text-danger hover:bg-danger/5 border-divider'
            }`}
            onPress={() => onFavoriteFilterChange(!isFavoriteFilter)}
          >
            <Heart
              className={`size-3.5 ${isFavoriteFilter ? 'fill-current' : ''}`}
              strokeWidth={isFavoriteFilter ? 3 : 2}
            />
            Favoritos
          </Button>

          <Select
            aria-label='Ordenar por'
            variant='primary'
            placeholder='Ordenar por'
            selectedKey={getSortSelectedKey()}
            onSelectionChange={(key) => {
              if (key) handleSortSelection(key as string)
            }}
            className='w-40'
          >
            <Select.Trigger className='h-9 text-xs'>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className='rounded-md'>
              <ListBox className='text-xs'>
                <ListBox.Item className='rounded-md' id='recent'>
                  Más recientes
                </ListBox.Item>
                <ListBox.Item className='rounded-md' id='oldest'>
                  Más antiguos
                </ListBox.Item>
                <ListBox.Item className='rounded-md' id='most-accessed'>
                  Más visitados
                </ListBox.Item>
                <ListBox.Item className='rounded-md' id='last-accessed'>
                  Últimos visitados
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            aria-label='Periodo'
            variant='primary'
            placeholder='Periodo'
            selectedKey={accessedWithin}
            onSelectionChange={(key) => {
              if (key) onAccessedWithinChange(key as 'week' | 'month' | 'all')
            }}
            className='w-40'
          >
            <Select.Trigger className='h-9 text-xs'>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className='rounded-md'>
              <ListBox className='text-xs'>
                <ListBox.Item className='rounded-md' id='all'>
                  Siempre
                </ListBox.Item>
                <ListBox.Item className='rounded-md' id='week'>
                  Esta semana
                </ListBox.Item>
                <ListBox.Item className='rounded-md' id='month'>
                  Este mes
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            size='sm'
            variant='outline'
            onPress={onClearFilters}
            className='font-medium text-danger bg-danger/5 border-danger/20 hover:bg-danger/20 hover:border-danger/40 transition-all rounded-md'
          >
            <X className='size-4 translate-y-[0.5px]' strokeWidth={2.5} />
            <span>Limpiar filtros</span>
          </Button>
        )}
      </div>

      {tags.length > 0 && (
        <div className='flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full'>
          <div className='flex items-center gap-1.5 text-neutral-400 mr-1 flex-shrink-0'>
            <TagIcon className='size-3.5' />
          </div>
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.id)
            const colorConfig = COLORS_MAP[tag.color as keyof typeof COLORS_MAP] || COLORS_MAP.blue

            return (
              <Button
                key={tag.id}
                size='sm'
                variant={isSelected ? 'primary' : 'outline'}
                className={`font-medium flex-shrink-0 rounded-md transition-all ${
                  isSelected
                    ? `${colorConfig.background} text-white border-transparent shadow-sm`
                    : `text-neutral-500 border-divider hover:text-foreground hover:bg-content2`
                }`}
                onPress={() => onTagSelectionChange(tag.id)}
              >
                <div
                  className={`size-1.5 rounded-full mr-1.5 ${
                    isSelected ? 'bg-white' : colorConfig.background
                  }`}
                />
                {tag.name}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BookmarkFilters
