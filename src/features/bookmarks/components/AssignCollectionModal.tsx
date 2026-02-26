import { useParams } from 'react-router'
import {
  addToast,
  Button,
  closeToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
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
    onMutate: () => {
      const idToast = addToast({ title: 'Asignando a colección...' })
      return { idToast }
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.idToast) closeToast(context.idToast)
      addToast({ title: 'Marcador asignado', color: 'success' })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      onOpenChange(false)
    },
    onError: (_error, _variables, context) => {
      if (context?.idToast) closeToast(context.idToast)
      addToast({ title: 'Error al asignar a la colección', color: 'danger' })
    },
  })

  const removeMutation = useMutation({
    mutationFn: () => BookmarkService.removeFromCollection(bookmark.id),
    onMutate: () => {
      const idToast = addToast({ title: 'Quitando de colección...' })
      return { idToast }
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.idToast) closeToast(context.idToast)
      addToast({ title: 'Marcador removido de la colección', color: 'success' })
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['collections'] })
      onOpenChange(false)
    },
    onError: (_error, _variables, context) => {
      if (context?.idToast) closeToast(context.idToast)
      addToast({ title: 'Error al remover de la colección', color: 'danger' })
    },
  })

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='sm'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-primary'>
              Mover a Colección
            </ModalHeader>
            <ModalBody>
              {isLoading ? (
                <div className='py-8 text-center text-neutral-400'>Cargando colecciones...</div>
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
                      return (
                        <Button
                          key={collection.id}
                          variant='light'
                          color='default'
                          className='justify-start h-14 shrink-0 transition-transform active:scale-[0.98]'
                          startContent={
                            <div className='p-2 bg-primary/10 text-primary rounded-lg mr-2'>
                              <Folder className='size-5' fill='currentColor' />
                            </div>
                          }
                          onPress={() => assignMutation.mutate(collection.id)}
                          isLoading={
                            assignMutation.isPending && assignMutation.variables === collection.id
                          }
                          isDisabled={assignMutation.isPending || removeMutation.isPending}
                        >
                          <div className='flex flex-col items-start'>
                            <span className='font-semibold text-sm'>{collection.name}</span>
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
            </ModalBody>
            <ModalFooter className='border-t border-divider pt-4'>
              <Button
                color='danger'
                variant='flat'
                className='w-full'
                startContent={<FolderX className='size-4' />}
                onPress={() => removeMutation.mutate()}
                isLoading={removeMutation.isPending}
                isDisabled={assignMutation.isPending || removeMutation.isPending}
              >
                Quitar de colección
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AssignCollectionModal
