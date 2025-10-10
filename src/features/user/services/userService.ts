import api from '../../../core/interceptors/auth.interceptor'
import type { User } from '../types/user.type'

const UserService = {
  getProfile: async (): Promise<User | null> => {
    const { data } = await api.get('/users/me')
    const { user } = data.data
    return user
  },
}

export default UserService
