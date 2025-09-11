import { useQuery } from '@tanstack/react-query'

import BookmarkCard from '../../components/BookmarkCard'
import BookmarkService from '../../services/bookmarkService'

const BookmarksPage = () => {
  //const queryClient = useQueryClient()
  const {
    data: bookmarks = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: BookmarkService.getList,
    initialData: [],
  })

  console.log('BookmarksPage -> bookmarks', bookmarks)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {(error as Error).message}</div>
  if (isFetching) return <div>Updating...</div>
  if (bookmarks.length === 0) return <div>No bookmarks found.</div>

  return (
    <div className='flex flex-col gap-4'>
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}

export default BookmarksPage
