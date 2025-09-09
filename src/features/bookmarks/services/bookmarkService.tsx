import api from '../../../core/interceptors/auth.interceptor'

const BookmarkService = {
  getList: async () => {
    const { data } = await api.get('/bookmarks')
    return data.data.bookmarks
  },
}

export default BookmarkService
