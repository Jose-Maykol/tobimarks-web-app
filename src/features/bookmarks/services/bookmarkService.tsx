import api from '../../../core/interceptors/auth.interceptor'
import type { ColorKey } from '../../tags/constants/tagColors'
import type { TagListItemResponse } from '../../tags/types/tags.type'
import type { BookmarkListItem, BookmarkListItemResponse } from '../types/boomark.type'

const BookmarkService = {
  create: async (url: string) => {
    const { data } = await api.post('/bookmarks', { url })
    return data.data
  },

  update: async (id: string, bookmark: { title: string; tags: string[] }) => {
    const { data } = await api.patch(`/bookmarks/${id}`, bookmark)
    return data.data
  },

  getList: async (): Promise<BookmarkListItem[]> => {
    const { data } = await api.get('/bookmarks')
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
}

export default BookmarkService
