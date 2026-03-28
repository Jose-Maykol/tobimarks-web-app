import { type FormEvent, useEffect, useState } from 'react'
import { Button, Form, Input, Label, Modal, TextArea, TextField, toast } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'

import ColorPicker from '../../../core/components/ColorPicker'
import { COLLECTION_ICONS } from '../constants/collectionVisuals'
import CollectionService from '../services/collectionService'
import type { Collection, CollectionColor, CollectionIcon } from '../types/collection.type'

interface UpdateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  collection: Collection | null
}

const UpdateCollectionModal = ({ isOpen, onClose, collection }: UpdateCollectionModalProps) => {
  const queryClient = useQueryClient()
  const [selectedIcon, setSelectedIcon] = useState<CollectionIcon>('folder')
  const [selectedColor, setSelectedColor] = useState<CollectionColor>('blue')

  useEffect(() => {
    if (collection) {
      setSelectedIcon(collection.icon || 'folder')
      setSelectedColor(collection.color || 'blue')
    }
  }, [collection, isOpen])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!collection) return

    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const name = formData.name.toString().trim()
    const description = formData.description?.toString().trim() || null

    const hasNoChanges =
      name === collection.name &&
      description === (collection.description || null) &&
      selectedIcon === collection.icon &&
      selectedColor === collection.color

    if (!name || hasNoChanges) {
      onClose()
      return
    }

    toast.promise(
      CollectionService.update(collection.id, {
        name,
        description,
        icon: selectedIcon,
        color: selectedColor,
      }),
      {
        loading: 'Actualizando colección...',
        success: () => {
          queryClient.invalidateQueries({ queryKey: ['collections'] })
          onClose()
          return 'Colección actualizada correctamente'
        },
        error: (error: unknown) => {
          const err = error as { response?: { data?: { message?: string } } }
          return err.response?.data?.message || 'Error al actualizar la colección'
        },
      }
    )
  }

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose}>
        <Modal.Container size='lg'>
          <Modal.Dialog className='rounded-md'>
            <Form onSubmit={handleSubmit} className='contents'>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className='text-primary'>Editar colección</Modal.Heading>
              </Modal.Header>
              <Modal.Body className='w-full flex flex-col gap-6 overflow-visible'>
                <TextField
                  name='name'
                  isRequired
                  maxLength={100}
                  autoFocus
                  defaultValue={collection?.name}
                  aria-label='Nombre'
                  className='p-1'
                >
                  <Label className='text-sm font-medium'>Nombre</Label>
                  <Input placeholder='Ej. Recursos de Diseño' variant='primary' className='mt-1' />
                </TextField>

                <TextField
                  name='description'
                  defaultValue={collection?.description || ''}
                  aria-label='Descripción'
                  className='p-1'
                >
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
                          className='w-full aspect-square rounded-md'
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
                <Button className='flex-1 rounded-md' variant='outline' onPress={onClose}>
                  Cancelar
                </Button>
                <Button className='flex-1 rounded-md' variant='primary' type='submit'>
                  Guardar cambios
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default UpdateCollectionModal
