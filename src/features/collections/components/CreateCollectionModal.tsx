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

interface CreateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateCollectionModal = ({ isOpen, onClose }: CreateCollectionModalProps) => {
  const queryClient = useQueryClient()

  const handleSubmit = (onModalClose: () => void) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const description = formData.description?.toString().trim() || null

    if (!name) return

    const idToast = addToast({
      title: 'Creando colección...',
      promise: CollectionService.create({ name, description })
        .then(() => {
          closeToast(idToast!)
          queryClient.invalidateQueries({ queryKey: ['collections'] })
          addToast({ title: 'Colección creada correctamente', color: 'success' })
          onModalClose()
        })
        .catch((error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } }
          addToast({
            title: err.response?.data?.message || 'Error al crear la colección',
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
            <ModalHeader className='text-primary'>Crear colección</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                autoFocus
                label='Nombre'
                labelPlacement='outside'
                name='name'
                placeholder='Ej. Recursos de Diseño'
                variant='bordered'
                isRequired
                maxLength={100}
              />
              <Textarea
                label='Descripción'
                labelPlacement='outside'
                name='description'
                placeholder='Escribe una breve descripción...'
                variant='bordered'
              />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' variant='bordered' onPress={onModalClose}>
                Cancelar
              </Button>
              <Button color='primary' className='flex-1' variant='solid' type='submit'>
                Crear
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateCollectionModal
