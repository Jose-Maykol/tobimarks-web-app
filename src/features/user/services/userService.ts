import api from '../../../core/interceptors/auth.interceptor'
import type { User } from '../types/user.type'

const UserService = {
  getProfile: async (): Promise<User | null> => {
    const { data } = await api.get('/users/me')
    const { user } = data.data
    return user
  },

  updateSettings: async (
    settings: Partial<{ aiAutoTags: boolean; aiAutoCollections: boolean }>
  ): Promise<void> => {
    await api.patch('/users/me/settings', settings)
  },
}

export default UserService
