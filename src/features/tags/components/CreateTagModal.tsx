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

import ColorPicker from '../../../core/components/ColorPicker'
import type { ColorKey } from '../constants/tagColors'
import TagService from '../services/tagService'

interface CreateTagModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateTagModal = ({ isOpen, onOpenChange }: CreateTagModalProps) => {
  const queryClient = useQueryClient()

  const createTagMutation = useMutation({
    mutationFn: ({ name, color }: { name: string; color: ColorKey }) =>
      TagService.create({ name, color }),
    onMutate: () => {
      const idToast = addToast({ title: 'Creando tag...' })
      return { idToast }
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: 'Tag creado con éxito' })
        queryClient.invalidateQueries({ queryKey: ['tags'] })
        onOpenChange(false)
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: 'Error al crear el tag' })
      }
    },
  })

  const handleSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const color = formData.color.toString().trim()

    createTagMutation.mutate({ name, color: color as ColorKey })
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
            <ModalHeader>Crear Tag</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                label='Nombre del Tag'
                labelPlacement='outside-top'
                name='name'
                placeholder='Ingrese el nombre del tag'
                errorMessage='El nombre es obligatorio'
                variant='bordered'
                required
              />
              <ColorPicker label='Color' />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' type='button' onPress={onClose}>
                Cancelar
              </Button>
              <Button className='flex-1' type='submit' variant='solid' color='primary'>
                Crear
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateTagModal
