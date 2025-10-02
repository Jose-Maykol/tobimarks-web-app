import type { ColorKey } from '../constants/tagColors'

export interface Tag {
  id: string
  name: string
  slug: string
  color: ColorKey
}

export type TagListItem = Pick<Tag, 'id' | 'name' | 'slug' | 'color'>

export type TagListItemResponse = Omit<TagListItem, 'color'> & {
  styleToken: string | null
}

export interface CreateTag {
  name: string
  styleToken: ColorKey
}
