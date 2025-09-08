import { create } from 'zustand'

import AuthService from '../auth/services/authService'

interface AuthStore {
  token: string | null
  signInWithGoogle: (idToken: string) => Promise<void>
  signOut: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  token: AuthService.getToken(),

  signInWithGoogle: async (idToken: string) => {
    await AuthService.signInWithGoogle(idToken)
    const token = AuthService.getToken()
    set({ token })
  },

  signOut: () => {
    AuthService.signOut()
    set({ token: null })
  },
}))

export default useAuthStore
