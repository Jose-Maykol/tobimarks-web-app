import api from '../../../core/interceptors/auth.interceptor'
import type { ColorKey } from '../constants/tagColors'
import type { CreateTag, TagListItem, TagListItemResponse } from '../types/tags.type'

const TagService = {
  create: async ({ name, styleToken }: CreateTag) => {
    const { data } = await api.post('/tags', { name, styleToken })
    return data.data
  },

  getList: async (): Promise<TagListItem[]> => {
    const { data } = await api.get('/tags')
    const { tags }: { tags: TagListItemResponse[] } = data.data
    return tags.map((tag) => ({
      ...tag,
      color: (tag.styleToken || 'stone') as ColorKey,
    }))
  },
}

export default TagService
