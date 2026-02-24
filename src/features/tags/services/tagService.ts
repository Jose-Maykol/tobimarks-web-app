import api from '../../../core/interceptors/auth.interceptor'
import type { ColorKey } from '../constants/tagColors'
import type { CreateTag, TagListItem, TagListItemResponse } from '../types/tags.type'

const TagService = {
  create: async ({ name, color }: CreateTag) => {
    const { data } = await api.post('/tags', { name, color })
    return data.data
  },

  getList: async (): Promise<TagListItem[]> => {
    const { data } = await api.get('/tags')
    const { tags }: { tags: TagListItemResponse[] } = data.data
    return tags.map((tag) => ({
      ...tag,
      color: (tag.color || 'stone') as ColorKey,
    }))
  },

  update: async (id: string, { name, color }: Partial<CreateTag>) => {
    const { data } = await api.patch(`/tags/${id}`, { name, color })
    return data.data
  },

  delete: async (id: string) => {
    await api.delete(`/tags/${id}`)
    return true
  },
}

export default TagService
