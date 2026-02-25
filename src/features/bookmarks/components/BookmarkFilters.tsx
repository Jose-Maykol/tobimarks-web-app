import { Button, Select, SelectItem, Tab, Tabs } from '@heroui/react'
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
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Tabs
            radius='sm'
            variant='light'
            classNames={{
              cursor: 'bg-content1 shadow-sm border border-divider/50',
              tabList: 'bg-default-100/50 p-1',
              tab: 'px-4 h-8',
            }}
            selectedKey={isFavoriteFilter ? 'favorites' : 'all'}
            onSelectionChange={(key) => onFavoriteFilterChange(key === 'favorites')}
          >
            <Tab key='all' title={<span className='font-medium'>Todos</span>} />
            <Tab
              key='favorites'
              title={
                <div className='flex items-center gap-2 font-medium'>
                  <Heart
                    className={`size-4 ${isFavoriteFilter ? 'fill-current text-danger' : ''}`}
                  />
                  <span>Favoritos</span>
                </div>
              }
            />
          </Tabs>

          <Select
            aria-label='Ordenar por'
            placeholder='Ordenar por'
            selectedKeys={[getSortSelectedKey()]}
            className='w-40'
            size='sm'
            radius='sm'
            variant={getSortSelectedKey() !== 'recent' ? 'flat' : 'faded'}
            color={getSortSelectedKey() !== 'recent' ? 'primary' : 'default'}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string
              if (selectedKey) handleSortSelection(selectedKey)
            }}
          >
            <SelectItem key='recent'>Más recientes</SelectItem>
            <SelectItem key='oldest'>Más antiguos</SelectItem>
            <SelectItem key='most-accessed'>Más visitados</SelectItem>
            <SelectItem key='last-accessed'>Últimos visitados</SelectItem>
          </Select>

          <Select
            aria-label='Periodo'
            placeholder='Periodo'
            selectedKeys={[accessedWithin]}
            className='w-40'
            size='sm'
            radius='sm'
            variant={accessedWithin !== 'all' ? 'flat' : 'faded'}
            color={accessedWithin !== 'all' ? 'primary' : 'default'}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as 'week' | 'month' | 'all'
              if (selectedKey) onAccessedWithinChange(selectedKey)
            }}
          >
            <SelectItem key='all'>Siempre</SelectItem>
            <SelectItem key='week'>Esta semana</SelectItem>
            <SelectItem key='month'>Este mes</SelectItem>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            size='sm'
            variant='flat'
            color='danger'
            onPress={onClearFilters}
            className='font-medium'
            startContent={<X className='size-4' />}
          >
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
                radius='sm'
                variant={isSelected ? 'flat' : 'light'}
                color={isSelected ? 'primary' : 'default'}
                className={`font-medium flex-shrink-0 ${isSelected ? '' : 'text-neutral-500 hover:text-neutral-foreground bg-default-50 hover:bg-default-100'}`}
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
