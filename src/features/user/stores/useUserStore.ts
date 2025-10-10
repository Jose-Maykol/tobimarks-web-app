import { create } from 'zustand'

import type { User } from '../types/user.type'

interface UserStore {
  user: User | null
  set: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  set: (user) => set({ user }),
}))
