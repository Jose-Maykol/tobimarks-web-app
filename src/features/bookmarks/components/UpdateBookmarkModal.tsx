import { type FormEvent, useState } from 'react'
import {
  addToast,
  Button,
  Chip,
  closeToast,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { COLORS_MAP } from '../../tags/constants/tagColors'
import TagService from '../../tags/services/tagService'
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

  const {
    data: tags = [],
    isLoading,
    error: tagsError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    enabled: isOpen,
  })

  if (tagsError) {
    addToast({ title: 'Error loading tags', color: 'danger' })
  }

  const [selected, setSelected] = useState<string[]>(bookmark.tags.map((tag) => tag.id))

  const toggleTag = (tag: string) => {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    console.log(selected)
  }

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

  const handleSubmit = () => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const title = formData.title.toString().trim()
    const tags = selected

    updateBookmarkMutation.mutate({ title, tags })
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
              {isLoading && <div>Cargando tags...</div>}
              {tags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      variant='bordered'
                      onClick={() => toggleTag(tag.id)}
                      className={`cursor-pointer border-2 ${COLORS_MAP[tag.color].border} ${
                        selected.includes(tag.id) ? COLORS_MAP[tag.color].background : null
                      }`}
                      classNames={{ content: 'font-semibold text-white text-xs' }}
                      radius='md'
                    >
                      {tag.name}
                    </Chip>
                  ))}
                </div>
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
