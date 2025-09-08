import { AUTH_TOKEN_KEY } from '../../../core/constants/storageKeys'
import api from '../../../core/interceptors/auth.interceptor'

const AuthService = {
  signInWithGoogle: async (idToken: string) => {
    const { data } = await api.post('/auth/google', { idToken })
    const authToken = data.data.accessToken
    localStorage.setItem(AUTH_TOKEN_KEY, authToken)
  },

  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },

  signOut: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },
}

export default AuthService
