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

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {(error as Error).message}</div>
  if (isFetching) return <div>Updating...</div>
  if (bookmarks.length === 0) return <div>No bookmarks found.</div>

  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Tus marcadores</h2>
      </div>
      <div className='flex flex-col gap-4'>
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  )
}

export default BookmarksPage
