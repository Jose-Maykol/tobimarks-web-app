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
import type { TagListItem } from '../types/tags.type'

interface CreateTagModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  tagToEdit?: TagListItem
}

const CreateTagModal = ({ isOpen, onOpenChange, tagToEdit }: CreateTagModalProps) => {
  const queryClient = useQueryClient()
  const isEditing = !!tagToEdit

  const mutation = useMutation({
    mutationFn: ({ id, name, color }: { id?: string; name: string; color: ColorKey }) =>
      isEditing && id ? TagService.update(id, { name, color }) : TagService.create({ name, color }),
    onMutate: () => {
      const idToast = addToast({ title: isEditing ? 'Actualizando tag...' : 'Creando tag...' })
      return { idToast }
    },
    onSuccess: (_data, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: isEditing ? 'Tag actualizado con éxito' : 'Tag creado con éxito' })
        queryClient.invalidateQueries({ queryKey: ['tags'] })
        onOpenChange(false)
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.idToast) {
        closeToast(context.idToast)
        addToast({ title: isEditing ? 'Error al actualizar el tag' : 'Error al crear el tag' })
      }
    },
  })

  // We rely on HeroUI Form to handle controlled/uncontrolled state
  // But we need to ensure the form knows about initial values if they change
  const handleSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const color = formData.color.toString().trim()

    mutation.mutate({
      id: tagToEdit?.id,
      name,
      color: color as ColorKey,
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
          <Form onSubmit={handleSubmit()}>
            <ModalHeader>{isEditing ? 'Editar Tag' : 'Crear Tag'}</ModalHeader>
            <ModalBody className='w-full'>
              <Input
                label='Nombre del Tag'
                labelPlacement='outside-top'
                name='name'
                placeholder='Ingrese el nombre del tag'
                errorMessage='El nombre es obligatorio'
                variant='bordered'
                defaultValue={tagToEdit?.name}
                required
              />
              <ColorPicker label='Color' defaultValue={tagToEdit?.color} />
            </ModalBody>
            <ModalFooter className='flex w-full gap-2'>
              <Button className='flex-1' type='button' onPress={onClose}>
                Cancelar
              </Button>
              <Button
                className='flex-1'
                type='submit'
                variant='solid'
                color='primary'
                isLoading={mutation.isPending}
              >
                {isEditing ? 'Guardar Cambios' : 'Crear'}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateTagModal
