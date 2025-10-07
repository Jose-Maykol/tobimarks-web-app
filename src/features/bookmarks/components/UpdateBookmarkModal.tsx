import { type FormEvent, useState } from 'react'
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

import { TagSelector } from '../../tags/components/TagSelector'
import { useTagStore } from '../../tags/stores/useTagStore'
import BookmarkService from '../services/bookmarkService'
import type { BookmarkListItem } from '../types/boomark.type'

interface UpdateBookmarkModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  bookmark: BookmarkListItem
  initialTitle: string
}

const UpdateBookmarkModal = ({
  isOpen,
  onOpenChange,
  bookmark,
  initialTitle,
}: UpdateBookmarkModalProps) => {
  const queryClient = useQueryClient()

  const tags = useTagStore((state) => state.tags)

  const updateBookmarkMutation = useMutation({
    mutationFn: ({ title, tags }: { title: string; tags: string[] }) =>
      BookmarkService.update(bookmark.id, { title, tags }),
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

  const [selectedTags, setSelectedTags] = useState<string[]>(bookmark.tags.map((tag) => tag.id))

  const handleSubmit = () => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const title = formData.title.toString().trim()
    const tags = selectedTags

    updateBookmarkMutation.mutate({ title, tags })
  }

  const handleSelectedTags = (selected: string[]) => {
    setSelectedTags(selected)
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
              {tags.length > 0 && (
                <TagSelector
                  tags={tags}
                  selectedTags={selectedTags}
                  onSelectionChange={handleSelectedTags}
                />
              )}
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
