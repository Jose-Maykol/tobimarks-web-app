import { Chip } from '@heroui/react'

import { COLORS_MAP } from '../constants/tagColors'
import type { TagListItem } from '../types/tags.type'

interface TagSelectorProps {
  tags: TagListItem[]
  selectedTags: string[]
  onSelectionChange: (selected: string[]) => void
}

export const TagSelector = ({ tags, selectedTags, onSelectionChange }: TagSelectorProps) => {
  const toggleTag = (tagId: string) => {
    const updatedSelected = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId]

    onSelectionChange(updatedSelected)
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          variant='bordered'
          onClick={() => toggleTag(tag.id)}
          className={`cursor-pointer border-2 ${COLORS_MAP[tag.color].border} ${
            selectedTags.includes(tag.id) ? COLORS_MAP[tag.color].background : null
          }`}
          classNames={{ content: 'font-semibold text-white text-xs' }}
          radius='md'
        >
          {tag.name}
        </Chip>
      ))}
    </div>
  )
}
