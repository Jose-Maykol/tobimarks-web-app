import api from '../../../core/interceptors/auth.interceptor'
import type { ColorKey } from '../../tags/constants/tagColors'
import type { TagListItemResponse } from '../../tags/types/tags.type'
import type { BookmarkListItem, BookmarkListItemResponse } from '../types/boomark.type'

export interface GetBookmarksParams {
  isFavorite?: boolean
  tags?: string[]
  sortBy?: string
  sortDirection?: string
}

const BookmarkService = {
  create: async (url: string) => {
    const { data } = await api.post('/bookmarks', { url })
    return data.data
  },

  update: async (id: string, bookmark: { title: string; tags: string[] }) => {
    const { data } = await api.patch(`/bookmarks/${id}`, bookmark)
    return data.data
  },

  getList: async (params?: GetBookmarksParams): Promise<BookmarkListItem[]> => {
    const queryParams: Record<string, string> = {}
    if (params?.isFavorite) queryParams.isFavorite = 'true'
    if (params?.tags && params.tags.length > 0) queryParams.tags = params.tags.join(',')
    if (params?.sortBy) queryParams.sortBy = params.sortBy
    if (params?.sortDirection) queryParams.sortDirection = params.sortDirection

    const { data } = await api.get('/bookmarks', { params: queryParams })
    const { bookmarks }: { bookmarks: BookmarkListItemResponse[] } = data.data
    return bookmarks.map((bookmark) => ({
      ...bookmark,
      tags: bookmark.tags.map((tag: TagListItemResponse) => ({
        ...tag,
        color: tag.color as ColorKey,
      })),
      lastAccessedAt: bookmark.lastAccessedAt ? new Date(bookmark.lastAccessedAt) : null,
    }))
  },

  markAsFavorite: async (id: string): Promise<void> => {
    await api.patch(`/bookmarks/${id}/favorite`)
  },

  unmarkAsFavorite: async (id: string): Promise<void> => {
    await api.delete(`/bookmarks/${id}/favorite`)
  },

  registerAccess: async (id: string): Promise<void> => {
    await api.patch(`/bookmarks/${id}/access`)
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/bookmarks/${id}`)
  },
}

export default BookmarkService
