import { type FormEvent, useEffect, useState } from 'react'
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

  const handleSubmit = (onModalClose: () => void) => async (event: FormEvent<HTMLFormElement>) => {
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
      onModalClose()
      return
    }

    const idToast = addToast({
      title: 'Actualizando colección...',
      promise: CollectionService.update(collection.id, {
        name,
        description,
        icon: selectedIcon,
        color: selectedColor,
      })
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
      size='lg'
      classNames={{
        closeButton: 'focus:outline-none focus:ring-0 focus:shadow-none',
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <Form onSubmit={handleSubmit(onModalClose)} className='w-full'>
            <ModalHeader className='text-primary'>Editar colección</ModalHeader>
            <ModalBody className='w-full gap-6'>
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
                        variant={selectedIcon === iconKey ? 'solid' : 'flat'}
                        color={selectedIcon === iconKey ? 'primary' : 'default'}
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
