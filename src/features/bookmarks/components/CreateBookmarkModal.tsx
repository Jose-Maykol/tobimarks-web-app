import type { FormEvent } from 'react'
import { useLocation } from 'react-router'
import { Button, Form, Input, Label, Modal, TextField, toast } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'

import BookmarkService from '../services/bookmarkService'

interface CreateBookmarkModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateBookmarkModal = ({ isOpen, onOpenChange }: CreateBookmarkModalProps) => {
  const queryClient = useQueryClient()
  const location = useLocation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const url = formData.url.toString().trim()

    toast.promise(BookmarkService.create(url), {
      loading: 'Creando marcador...',
      success: () => {
        if (location.pathname === '/bookmarks' || location.pathname.startsWith('/collections/')) {
          queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
        }
        onOpenChange(false)
        return 'Marcador creado con éxito'
      },
      error: 'Error al crear marcador',
    })
  }

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container>
          <Modal.Dialog className='rounded-md'>
            <Form onSubmit={handleSubmit} className='contents'>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className='text-primary'>Crear Nuevo Marcador</Modal.Heading>
              </Modal.Header>
              <Modal.Body className='w-full overflow-visible'>
                <TextField
                  name='url'
                  isRequired
                  type='url'
                  aria-label='URL del Marcador'
                  className='p-1'
                >
                  <Label className='text-xs font-semibold uppercase text-foreground/70'>
                    URL del Marcador
                  </Label>
                  <Input variant='primary' placeholder='https://example.com' className='mt-1' />
                </TextField>
              </Modal.Body>
              <Modal.Footer className='flex w-full gap-2'>
                <Button
                  className='flex-1 rounded-md'
                  variant='outline'
                  onPress={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button className='flex-1 rounded-md' variant='primary' type='submit'>
                  Crear
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}

export default CreateBookmarkModal
