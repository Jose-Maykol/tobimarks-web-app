import api from '../../../core/interceptors/auth.interceptor'

const TagService = {
  create: async (name: string) => {
    const { data } = await api.post('/tags', { name })
    return data.data
  },
}

export default TagService
