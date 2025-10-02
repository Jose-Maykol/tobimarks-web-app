import { lazy, Suspense } from 'react'
import { Button, useDisclosure } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import TagItem from '../components/TagItem'
import TagService from '../services/tagService'

const CreateTagModal = lazy(() => import('../components/CreateTagModal'))

const TagsPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const {
    data: tags = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    initialData: [],
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {(error as Error).message}</div>
  if (isFetching) return <div>Updating...</div>
  if (tags.length === 0) return <div>No tags found.</div>

  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold'>Tus tags</h2>
      </div>
      <div className='flex flex-row justify-end'>
        <Button color='primary' startContent={<Plus size={16} strokeWidth={4} />} onPress={onOpen}>
          Crear tag
        </Button>
        <Suspense fallback={null}>
          <CreateTagModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </Suspense>
      </div>
      <div className='flex flex-row gap-2'>
        {tags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  )
}

export default TagsPage
