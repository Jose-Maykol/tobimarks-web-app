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

import ColorPicker from '../../../core/components/ColorPicker'
import TagService from '../services/tagService'

interface CreateTagModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateTagModal = ({ isOpen, onOpenChange }: CreateTagModalProps) => {
  const handleSubmit = (onClose: () => void) => async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const color = formData.color.toString().trim()
    const idToast = addToast({
      title: 'Creando tag...',
      promise: TagService.create(name)
        .then(() => {
          closeToast(idToast!)
          addToast({ title: 'Tag creado con éxito' })
          onClose()
        })
        .catch(() => {
          addToast({ title: 'Error al crear el tag' })
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
