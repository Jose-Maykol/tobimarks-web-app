import { Button, Modal, toast } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'

import CollectionService from '../services/collectionService'
import type { Collection } from '../types/collection.type'

interface DeleteCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collection: Collection | null
}

const DeleteCollectionModal = ({ isOpen, onClose, collection }: DeleteCollectionModalProps) => {
  const queryClient = useQueryClient()

  const handleConfirmDelete = () => {
    if (!collection) return

    toast.promise(CollectionService.delete(collection.id), {
      loading: 'Eliminando colección...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['collections'] })
        onClose()
        return 'Colección eliminada'
      },
      error: 'Error al eliminar la colección',
    })
  }

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose}>
        <Modal.Container size='sm'>
          <Modal.Dialog className='rounded-md'>
            <Modal.Header>
              <Modal.Heading className='text-danger'>Eliminar colección</Modal.Heading>
            </Modal.Header>
            <Modal.Body className='w-full'>
              <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                ¿Estás seguro que deseas eliminar la colección{' '}
                <span className='font-semibold text-foreground'>{collection?.name}</span>? Los
                marcadores dentro de ella no se eliminarán, pero perderán su asignación.
              </p>
            </Modal.Body>
            <Modal.Footer className='flex w-full gap-2'>
              <Button className='flex-1 rounded-md' variant='outline' onPress={onClose}>
                Cancelar
              </Button>
              <Button className='flex-1 rounded-md' variant='danger' onPress={handleConfirmDelete}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default DeleteCollectionModal
