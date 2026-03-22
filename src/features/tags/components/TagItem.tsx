import { Chip } from '@heroui/react'

import { COLORS_MAP } from '../constants/tagColors'
import type { TagListItem } from '../types/tags.type'

interface TagItemProps {
  tag: TagListItem
}

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Chip className={`${COLORS_MAP[tag.color].background} rounded-md`}>
      <Chip.Label className='font-semibold text-white text-xs'>{tag.name}</Chip.Label>
    </Chip>
  )
}

export default TagItem
