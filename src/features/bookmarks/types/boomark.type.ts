import type { Tag, TagListItemResponse } from '../../tags/types/tags.type'
import type { Website } from './website.type'

export interface Bookmark {
  id: string
  websiteId: string
  url: string
  title: string
  description: string | null
  isFavorite: boolean
  isArchived: boolean
  lastAccessedAt: Date | null
  accessCount: number
  tags: Tag[]
}

export type BookmarkListItem = Pick<
  Bookmark,
  'id' | 'url' | 'title' | 'isFavorite' | 'isArchived' | 'accessCount' | 'tags'
> &
  Pick<Website, 'domain' | 'faviconUrl'>

export type BookmarkListItemResponse = Omit<BookmarkListItem, 'lastAccessedAt'> & {
  lastAccessedAt: string | null
  tags: TagListItemResponse[]
}
