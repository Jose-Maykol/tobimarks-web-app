import type { FormEvent } from 'react'
import {
  addToast,
  Button,
  closeToast,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'

import CollectionService from '../services/collectionService'
import type { Collection } from '../types/collection.type'

interface UpdateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collection: Collection | null
}

const UpdateCollectionModal = ({ isOpen, onClose, collection }: UpdateCollectionModalProps) => {
  const queryClient = useQueryClient()

  const handleSubmit = (onModalClose: () => void) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!collection) return

    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const description = formData.description?.toString().trim() || null

    if (!name || (name === collection.name && description === (collection.description || null))) {
      onModalClose()
      return
    }

    const idToast = addToast({
      title: 'Actualizando colección...',
      promise: CollectionService.update(collection.id, { name, description })
        .then(() => {
          closeToast(idToast!)
          queryClient.invalidateQueries({ queryKey: ['collections'] })
          addToast({ title: 'Colección actualizada correctamente', color: 'success' })
          onModalClose()
        })
        .catch((error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } }
          addToast({
            title: err.response?.data?.message || 'Error al actualizar la colección',
            color: 'danger',
          })
        }),
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      classNames={{
        closeButton: 'focus:outline-none focus:ring-0 focus:shadow-none',
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <Form onSubmit={handleSubmit(onModalClose)} className='w-full'>
            <ModalHeader className='text-primary'>Editar colección</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                autoFocus
                label='Nombre'
                labelPlacement='outside'
                name='name'
                placeholder='Ej. Recursos de Diseño'
                variant='bordered'
                defaultValue={collection?.name}
                isRequired
                maxLength={100}
              />
              <Textarea
                label='Descripción'
                labelPlacement='outside'
                name='description'
                placeholder='Escribe una breve descripción...'
                variant='bordered'
                defaultValue={collection?.description || ''}
              />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' variant='bordered' onPress={onModalClose}>
                Cancelar
              </Button>
              <Button color='primary' className='flex-1' variant='solid' type='submit'>
                Guardar cambios
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UpdateCollectionModal
