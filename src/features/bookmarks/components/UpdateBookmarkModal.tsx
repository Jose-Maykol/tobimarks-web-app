import { type FormEvent, useState } from 'react'
import { Button, Form, Input, Label, Modal, TextField, toast } from '@heroui/react'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      onOpenChange(false)
    },
  })

  const [selectedTags, setSelectedTags] = useState<string[]>(bookmark.tags.map((tag) => tag.id))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const title = formData.title.toString().trim()
    const tags = selectedTags

    toast.promise(updateBookmarkMutation.mutateAsync({ title, tags }), {
      loading: 'Actualizando marcador...',
      success: 'Marcador actualizado con éxito',
      error: 'Error al actualizar marcador',
    })
  }

  const handleSelectedTags = (selected: string[]) => {
    setSelectedTags(selected)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop />
      <Modal.Container>
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Modal.Header>
              <Modal.Heading className='text-primary'>Actualizar Marcador</Modal.Heading>
            </Modal.Header>
            <Modal.Body className='w-full'>
              <TextField
                name='title'
                defaultValue={initialTitle}
                isRequired
                className='flex flex-col gap-2'
              >
                <Label className='text-sm font-medium'>Título del marcador</Label>
                <Input
                  placeholder='Nuevo título'
                  className='w-full px-3 py-2 bg-content2 border border-divider rounded-sm'
                />
              </TextField>

              {tags.length > 0 && (
                <div className='mt-4'>
                  <TagSelector
                    tags={tags}
                    selectedTags={selectedTags}
                    onSelectionChange={handleSelectedTags}
                  />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className='flex w-full gap-2'>
              <Button className='flex-1' variant='outline' onPress={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button variant='primary' className='flex-1' type='submit'>
                Actualizar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}

export default UpdateBookmarkModal
