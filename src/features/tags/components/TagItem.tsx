import { Chip } from '@heroui/react'

import { COLORS_MAP } from '../constants/tagColors'
import type { TagListItem } from '../types/tags.type'

interface TagItemProps {
  tag: TagListItem
}

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Chip className={`${COLORS_MAP[tag.color]}`} classNames={{ content: 'font-semibold' }}>
      {tag.name}
    </Chip>
  )
}

export default TagItem
