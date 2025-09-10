import api from '../../../core/interceptors/auth.interceptor'

const BookmarkService = {
  create: async (url: string) => {
    const { data } = await api.post('/bookmarks', { url })
    return data.data
  },

  getList: async () => {
    const { data } = await api.get('/bookmarks')
    return data.data.bookmarks
  },
}

export default BookmarkService
