export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  settings: {
    aiAutoTags: boolean
    aiAutoCollections: boolean
  }
}
