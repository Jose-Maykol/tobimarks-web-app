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
} from '@heroui/react'

import BookmarkService from '../services/bookmarkService'

interface CreateBookmarkModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateBookmarkModal = ({ isOpen, onOpenChange }: CreateBookmarkModalProps) => {
  const handleSubmit = (onClose: () => void) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const url = formData.url.toString().trim()
    const idToast = addToast({
      title: 'Creando marcador...',
      promise: BookmarkService.create(url)
        .then(() => {
          closeToast(idToast!)
          addToast({ title: 'Marcador creado con éxito', color: 'success' })
          onClose()
        })
        .catch(() => {
          addToast({
            title: 'Error al crear marcador',
            color: 'danger',
          })
        }),
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        closeButton: 'focus:outline-none focus:ring-0 focus:shadow-none',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <Form onSubmit={handleSubmit(onClose)}>
            <ModalHeader className='text-primary'>Crear Nuevo Marcador</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                label='URL del Marcador'
                labelPlacement='outside-top'
                name='url'
                placeholder='https://example.com'
                errorMessage='Por favor ingresa una URL válida'
                variant='bordered'
                type='url'
                required
              />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' variant='bordered' onPress={onClose}>
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

export default CreateBookmarkModal
