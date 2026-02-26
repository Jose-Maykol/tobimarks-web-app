export interface Collection {
  id: string
  userId: string
  name: string
  description: string | null
  bookmarksCount: number
  createdAt: Date
  updatedAt: Date
}

export type CollectionListItemResponse = Omit<Collection, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}

export interface CreateCollectionDto {
  name: string
  description?: string | null
}

export interface UpdateCollectionDto {
  name?: string
  description?: string | null
}
