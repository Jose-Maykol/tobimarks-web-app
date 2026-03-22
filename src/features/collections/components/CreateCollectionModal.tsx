import { type FormEvent, useState } from 'react'
import { Button, Form, Input, Label, Modal, TextArea, TextField, toast } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'

import ColorPicker from '../../../core/components/ColorPicker'
import { COLLECTION_ICONS } from '../constants/collectionVisuals'
import CollectionService from '../services/collectionService'
import type { CollectionColor, CollectionIcon } from '../types/collection.type'

interface CreateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateCollectionModal = ({ isOpen, onClose }: CreateCollectionModalProps) => {
  const queryClient = useQueryClient()
  const [selectedIcon, setSelectedIcon] = useState<CollectionIcon>('folder')
  const [selectedColor, setSelectedColor] = useState<CollectionColor>('blue')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const description = formData.description?.toString().trim() || null

    if (!name) return

    toast.promise(
      CollectionService.create({
        name,
        description,
        icon: selectedIcon,
        color: selectedColor,
      }),
      {
        loading: 'Creando colección...',
        success: () => {
          queryClient.invalidateQueries({ queryKey: ['collections'] })
          onClose()
          setSelectedIcon('folder')
          setSelectedColor('blue')
          return 'Colección creada correctamente'
        },
        error: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } }
          return err.response?.data?.message || 'Error al crear la colección'
        },
      }
    )
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop />
      <Modal.Container size='lg'>
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Form onSubmit={handleSubmit} className='w-full'>
            <Modal.Header>
              <Modal.Heading className='text-primary'>Crear colección</Modal.Heading>
            </Modal.Header>
            <Modal.Body className='w-full flex flex-col gap-6'>
              <TextField name='name' isRequired maxLength={100} autoFocus aria-label='Nombre'>
                <Label className='text-sm font-medium'>Nombre</Label>
                <Input placeholder='Ej. Recursos de Diseño' variant='primary' className='mt-1' />
              </TextField>

              <TextField name='description' aria-label='Descripción'>
                <Label className='text-sm font-medium'>Descripción</Label>
                <TextArea
                  placeholder='Escribe una breve descripción...'
                  variant='primary'
                  className='mt-1'
                />
              </TextField>

              <div className='flex flex-col gap-3'>
                <label className='text-sm font-medium'>Icono</label>
                <div className='grid grid-cols-5 sm:grid-cols-8 gap-2'>
                  {(Object.keys(COLLECTION_ICONS) as CollectionIcon[]).map((iconKey) => {
                    const IconComp = COLLECTION_ICONS[iconKey]
                    return (
                      <Button
                        key={iconKey}
                        isIconOnly
                        size='sm'
                        variant={selectedIcon === iconKey ? 'primary' : 'ghost'}
                        onPress={() => setSelectedIcon(iconKey)}
                        className='w-full aspect-square'
                      >
                        <IconComp className='size-4' strokeWidth={1.5} />
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <ColorPicker
                  value={selectedColor}
                  onChange={(color) => setSelectedColor(color as CollectionColor)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className='flex w-full gap-2'>
              <Button className='flex-1' variant='ghost' onPress={onClose}>
                Cancelar
              </Button>
              <Button className='flex-1' variant='primary' type='submit'>
                Crear
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}

export default CreateCollectionModal
