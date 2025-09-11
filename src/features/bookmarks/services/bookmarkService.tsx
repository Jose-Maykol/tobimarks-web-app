import api from '../../../core/interceptors/auth.interceptor'
import type { BookmarkListItem, BookmarkListItemResponse } from '../types/boomark.type'

const BookmarkService = {
  create: async (url: string) => {
    const { data } = await api.post('/bookmarks', { url })
    return data.data
  },

  getList: async (): Promise<BookmarkListItem[]> => {
    const { data } = await api.get('/bookmarks')
    const { bookmarks }: { bookmarks: BookmarkListItemResponse[] } = data.data
    return bookmarks.map((bookmark) => ({
      ...bookmark,
      lastAccessedAt: bookmark.lastAccessedAt ? new Date(bookmark.lastAccessedAt) : null,
    }))
  },
}

export default BookmarkService
