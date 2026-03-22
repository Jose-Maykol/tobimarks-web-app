import { Button, ListBox, Select, Tabs } from '@heroui/react'
import { Heart, Tag as TagIcon, X } from 'lucide-react'

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
          <Tabs
            variant='secondary'
            selectedKey={isFavoriteFilter ? 'favorites' : 'all'}
            onSelectionChange={(key) => onFavoriteFilterChange(key === 'favorites')}
          >
            <Tabs.List className='p-1'>
              <Tabs.Tab id='all'>
                <span className='font-medium text-xs'>Todos</span>
              </Tabs.Tab>
              <Tabs.Tab id='favorites'>
                <div className='flex items-center gap-2 font-medium text-xs'>
                  <Heart
                    className={`size-3.5 ${isFavoriteFilter ? 'fill-current text-danger' : ''}`}
                  />
                  <span>Favoritos</span>
                </div>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

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
            <Select.Popover>
              <ListBox className='text-xs'>
                <ListBox.Item id='recent'>Más recientes</ListBox.Item>
                <ListBox.Item id='oldest'>Más antiguos</ListBox.Item>
                <ListBox.Item id='most-accessed'>Más visitados</ListBox.Item>
                <ListBox.Item id='last-accessed'>Últimos visitados</ListBox.Item>
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
            <Select.Popover>
              <ListBox className='text-xs'>
                <ListBox.Item id='all'>Siempre</ListBox.Item>
                <ListBox.Item id='week'>Esta semana</ListBox.Item>
                <ListBox.Item id='month'>Este mes</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            size='sm'
            variant='ghost'
            onPress={onClearFilters}
            className='font-medium text-danger hover:bg-danger/10'
          >
            <X className='size-4' />
            Limpiar filtros
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
            return (
              <Button
                key={tag.id}
                size='sm'
                variant={isSelected ? 'primary' : 'ghost'}
                className={`font-medium flex-shrink-0 ${isSelected ? '' : 'text-neutral-500'}`}
                onPress={() => onTagSelectionChange(tag.id)}
              >
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
