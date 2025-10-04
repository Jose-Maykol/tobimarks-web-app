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
import { useMutation, useQueryClient } from '@tanstack/react-query'

import BookmarkService from '../services/bookmarkService'

interface UpdateBookmarkModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bookmarkId: string
  initialTitle: string
}

const UpdateBookmarkModal = ({
  isOpen,
  onOpenChange,
  bookmarkId,
  initialTitle,
}: UpdateBookmarkModalProps) => {
  const queryClient = useQueryClient()

  const updateBoommarkMutation = useMutation({
    mutationFn: ({ title }: { title: string }) =>
      BookmarkService.update(bookmarkId, { title, tags: [] }),
    onMutate: () => {
      const idToast = addToast({ title: 'Actualizando marcador...' })
      return { idToast }
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: 'Marcador actualizado con éxito', color: 'success' })
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
        onOpenChange(false)
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: 'Error al actualizar marcador', color: 'danger' })
      }
    },
  })

  const handleSubmit = () => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const title = formData.title.toString().trim()

    updateBoommarkMutation.mutate({ title })
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
          <Form onSubmit={handleSubmit()}>
            <ModalHeader className='text-primary'>Actualizar Marcador</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                label='Título del marcador'
                labelPlacement='outside-top'
                name='title'
                placeholder='Nuevo título'
                defaultValue={initialTitle}
                errorMessage='Por favor ingresa un título válido'
                variant='bordered'
                type='text'
                required
              />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' variant='bordered' onPress={onClose}>
                Cancelar
              </Button>
              <Button color='primary' className='flex-1' variant='solid' type='submit'>
                Actualizar
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UpdateBookmarkModal
