import { Chip } from '@heroui/react'

import { COLORS_MAP } from '../constants/tagColors'
import type { TagListItem } from '../types/tags.type'

interface TagItemProps {
  tag: TagListItem
}

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Chip
      className={`${COLORS_MAP[tag.color].background}`}
      classNames={{ content: 'font-semibold text-white text-xs' }}
      radius='md'
    >
      {tag.name}
    </Chip>
  )
}

export default TagItem
