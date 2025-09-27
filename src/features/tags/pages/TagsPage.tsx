import { lazy, Suspense } from 'react'
import { Button, useDisclosure } from '@heroui/react'
import { Plus } from 'lucide-react'

const CreateTagModal = lazy(() => import('../components/CreateTagModal'))

const TagsPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
    </div>
  )
}

export default TagsPage
