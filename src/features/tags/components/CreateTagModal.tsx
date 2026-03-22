import { Button, Form, Input, Label, Modal, Spinner, TextField, toast } from '@heroui/react'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      onOpenChange(false)
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const color = formData.color.toString().trim()

    toast.promise(
      mutation.mutateAsync({
        id: tagToEdit?.id,
        name,
        color: color as ColorKey,
      }),
      {
        loading: isEditing ? 'Actualizando tag...' : 'Creando tag...',
        success: isEditing ? 'Tag actualizado con éxito' : 'Tag creado con éxito',
        error: isEditing ? 'Error al actualizar el tag' : 'Error al crear el tag',
      }
    )
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop />
      <Modal.Container>
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            <Modal.Header>
              <Modal.Heading>{isEditing ? 'Editar Tag' : 'Crear Tag'}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className='w-full flex flex-col gap-4'>
              <TextField
                name='name'
                defaultValue={tagToEdit?.name}
                isRequired
                aria-label='Nombre del Tag'
              >
                <Label className='text-xs font-semibold uppercase text-foreground/70'>
                  Nombre del Tag
                </Label>
                <Input variant='primary' placeholder='Ingrese el nombre del tag' className='mt-1' />
              </TextField>
              <ColorPicker label='Color' defaultValue={tagToEdit?.color} />
            </Modal.Body>
            <Modal.Footer className='flex w-full gap-2'>
              <Button
                className='flex-1'
                type='button'
                onPress={() => onOpenChange(false)}
                variant='ghost'
              >
                Cancelar
              </Button>
              <Button
                className='flex-1'
                type='submit'
                variant='primary'
                isDisabled={mutation.isPending}
              >
                {mutation.isPending && <Spinner size='sm' color='current' className='mr-2' />}
                {isEditing ? 'Guardar Cambios' : 'Crear'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}

export default CreateTagModal
