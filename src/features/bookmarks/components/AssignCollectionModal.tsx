import { useParams } from 'react-router'
import { Button, Modal, Spinner, toast } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Folder, FolderX } from 'lucide-react'

import CollectionService from '../../collections/services/collectionService'
import BookmarkService from '../services/bookmarkService'
import type { BookmarkListItem } from '../types/boomark.type'

interface AssignCollectionModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bookmark: BookmarkListItem
}

const AssignCollectionModal = ({ isOpen, onOpenChange, bookmark }: AssignCollectionModalProps) => {
  const queryClient = useQueryClient()
  const { id: currentCollectionId } = useParams<{ id: string }>()

  const activeCollectionId = bookmark.collectionId || currentCollectionId

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: () => CollectionService.getList(),
  })

  const assignMutation = useMutation({
    mutationFn: (collectionId: string) =>
      BookmarkService.assignToCollection(bookmark.id, collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      onOpenChange(false)
    },
  })

  const removeMutation = useMutation({
    mutationFn: () => BookmarkService.removeFromCollection(bookmark.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      onOpenChange(false)
    },
  })

  const handleAssign = (collectionId: string) => {
    toast.promise(assignMutation.mutateAsync(collectionId), {
      loading: 'Asignando a colección...',
      success: 'Marcador asignado',
      error: 'Error al asignar a la colección',
    })
  }

  const handleRemove = () => {
    toast.promise(removeMutation.mutateAsync(), {
      loading: 'Quitando de colección...',
      success: 'Marcador removido de la colección',
      error: 'Error al remover de la colección',
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop />
      <Modal.Container size='sm'>
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header className='flex flex-col gap-1'>
            <Modal.Heading className='text-primary'>Mover a Colección</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <div className='py-8 flex justify-center'>
                <Spinner size='md' />
              </div>
            ) : collections.filter((c) => c.id !== activeCollectionId).length === 0 ? (
              <div className='flex flex-col items-center justify-center py-8 text-center text-neutral-500'>
                <Folder className='size-12 mb-3 text-neutral-300' />
                <p>No hay otras colecciones disponibles.</p>
              </div>
            ) : (
              <div className='flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar pb-2'>
                {collections
                  .filter((c) => c.id !== activeCollectionId)
                  .map((collection) => {
                    const isAssigning =
                      assignMutation.isPending && assignMutation.variables === collection.id
                    return (
                      <Button
                        key={collection.id}
                        variant='ghost'
                        className='justify-start h-14 shrink-0'
                        onPress={() => handleAssign(collection.id)}
                        isDisabled={assignMutation.isPending || removeMutation.isPending}
                      >
                        {isAssigning ? (
                          <Spinner size='sm' className='mr-2' />
                        ) : (
                          <div className='p-2 bg-primary/10 text-primary rounded-lg mr-2 inline-flex items-center justify-center'>
                            <Folder className='size-5' fill='currentColor' />
                          </div>
                        )}
                        <div className='flex flex-col items-start text-left'>
                          <span className='font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis'>
                            {collection.name}
                          </span>
                          <span className='text-xs text-neutral-500'>
                            {collection.bookmarksCount}{' '}
                            {collection.bookmarksCount === 1 ? 'marcador' : 'marcadores'}
                          </span>
                        </div>
                      </Button>
                    )
                  })}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className='border-t border-divider pt-4'>
            <Button
              variant='danger'
              className='w-full'
              onPress={handleRemove}
              isDisabled={assignMutation.isPending || removeMutation.isPending}
            >
              {removeMutation.isPending ? (
                <Spinner size='sm' color='current' />
              ) : (
                <FolderX className='size-4' />
              )}
              Quitar de colección
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}

export default AssignCollectionModal
