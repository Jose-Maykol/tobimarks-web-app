import { create } from 'zustand'

import TagService from '../services/tagService'
import type { TagListItem } from '../types/tags.type'

interface TagStore {
  tags: TagListItem[]
  isLoading: boolean
  error: string | null
  getList: () => Promise<void>
  set: (tags: TagListItem[]) => void
  /* addTag: (tag: TagListItem) => void */
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  isLoading: false,
  error: null,

  getList: async () => {
    set({ isLoading: true, error: null })
    try {
      const tags = await TagService.getList()
      set({ tags, isLoading: false })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (error: unknown) {
      set({ error: 'Error loading tags', isLoading: false })
    }
  },

  set: (tags: TagListItem[]) => set({ tags }),
}))
