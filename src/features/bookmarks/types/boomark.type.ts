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
}

export type BookmarkListItem = Pick<
  Bookmark,
  'id' | 'url' | 'title' | 'isFavorite' | 'isArchived' | 'accessCount'
> &
  Pick<Website, 'domain' | 'faviconUrl'>

export type BookmarkListItemResponse = Omit<BookmarkListItem, 'lastAccessedAt'> & {
  lastAccessedAt: string | null
}
