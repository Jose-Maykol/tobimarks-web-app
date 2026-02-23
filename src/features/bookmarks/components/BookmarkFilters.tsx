import { Button, Tab, Tabs } from '@heroui/react'
import { Heart, Tag as TagIcon, TrendingUp, X } from 'lucide-react'

import type { TagListItem } from '../../tags/types/tags.type'

interface BookmarkFiltersProps {
  tags: TagListItem[]
  selectedTags: string[]
  onTagSelectionChange: (tagId: string) => void
  isFavoriteFilter: boolean
  onFavoriteFilterChange: (isFavorite: boolean) => void
  isMostAccessed: boolean
  onMostAccessedChange: (isMostAccessed: boolean) => void
  onClearFilters: () => void
}

const BookmarkFilters = ({
  tags,
  selectedTags,
  onTagSelectionChange,
  isFavoriteFilter,
  onFavoriteFilterChange,
  isMostAccessed,
  onMostAccessedChange,
  onClearFilters,
}: BookmarkFiltersProps) => {
  const hasActiveFilters = isFavoriteFilter || selectedTags.length > 0 || isMostAccessed

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Tabs
            radius='full'
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

          <Button
            size='sm'
            radius='full'
            variant={isMostAccessed ? 'flat' : 'light'}
            color={isMostAccessed ? 'primary' : 'default'}
            className={`font-medium h-8 ${isMostAccessed ? '' : 'text-neutral-500 hover:text-neutral-foreground bg-default-50 hover:bg-default-100'}`}
            onPress={() => onMostAccessedChange(!isMostAccessed)}
            startContent={<TrendingUp className='size-4' />}
          >
            Más visitados
          </Button>
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
