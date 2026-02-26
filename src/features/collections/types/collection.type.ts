export type CollectionIcon =
  | 'folder'
  | 'star'
  | 'heart'
  | 'bookmark'
  | 'archive'
  | 'tag'
  | 'code'
  | 'book'
  | 'music'
  | 'video'
  | 'image'
  | 'link'
  | 'briefcase'
  | 'globe'
  | 'shopping-cart'

export type CollectionColor =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'stone'

export interface Collection {
  id: string
  userId: string
  name: string
  description: string | null
  icon: CollectionIcon | null
  color: CollectionColor | null
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
  icon?: CollectionIcon | null
  color?: CollectionColor | null
}

export interface UpdateCollectionDto {
  name?: string
  description?: string | null
  icon?: CollectionIcon | null
  color?: CollectionColor | null
}
