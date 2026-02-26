import api from '../../../core/interceptors/auth.interceptor'
import type {
  Collection,
  CollectionListItemResponse,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../types/collection.type'

const CollectionService = {
  getList: async (): Promise<Collection[]> => {
    const { data } = await api.get('/collections')
    const { collections }: { collections: CollectionListItemResponse[] } = data.data

    return collections.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }))
  },

  getById: async (id: string): Promise<Collection> => {
    const { data } = await api.get(`/collections/${id}`)
    const item: CollectionListItemResponse = data.data
    return {
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }
  },

  create: async (payload: CreateCollectionDto): Promise<Collection> => {
    const { data } = await api.post('/collections', payload)
    return {
      ...data.data,
      createdAt: new Date(data.data.createdAt),
      updatedAt: new Date(data.data.updatedAt),
    }
  },

  update: async (id: string, payload: UpdateCollectionDto): Promise<Collection> => {
    const { data } = await api.patch(`/collections/${id}`, payload)
    return {
      ...data.data,
      createdAt: new Date(data.data.createdAt),
      updatedAt: new Date(data.data.updatedAt),
    }
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/collections/${id}`)
  },
}

export default CollectionService
