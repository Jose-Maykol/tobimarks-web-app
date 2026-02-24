import { lazy, Suspense, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Divider, useDisclosure } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import ManageTagChip from '../../tags/components/ManageTagChip'
import TagService from '../../tags/services/tagService'
import type { TagListItem } from '../../tags/types/tags.type'
import { useUserStore } from '../stores/useUserStore'

const CreateTagModal = lazy(() => import('../../tags/components/CreateTagModal'))

const ProfilePage = () => {
  const { user } = useUserStore()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [tagToEdit, setTagToEdit] = useState<TagListItem | undefined>(undefined)

  const queryClient = useQueryClient()

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: TagService.getList,
    initialData: [],
  })

  const deleteTagMutation = useMutation({
    mutationFn: TagService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })

  const handleEditTag = (tag: TagListItem) => {
    setTagToEdit(tag)
    onOpen()
  }

  const handleCreateTag = () => {
    setTagToEdit(undefined)
    onOpen()
  }

  return (
    <div className='max-w-4xl mx-auto flex flex-col gap-6 py-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-foreground'>Perfil y Configuración</h1>
        <p className='text-default-500'>Gestiona tu información personal y preferencias.</p>
      </div>

      {/* User Information Area */}
      <Card className='border-none bg-background shadow-none'>
        <CardHeader className='px-6 pt-6 pb-2'>
          <h2 className='text-xl font-semibold'>Datos del Usuario</h2>
        </CardHeader>
        <CardBody className='px-6 py-4'>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-sm text-default-500 mb-1'>Nombre de usuario</p>
              <p className='font-medium'>{user?.displayName || 'Cargando...'}</p>
            </div>
            <div>
              <p className='text-sm text-default-500 mb-1'>Correo electrónico</p>
              <p className='font-medium'>{user?.email || 'N/A'}</p>
            </div>
            {/* Additional info could go here */}
          </div>
        </CardBody>
      </Card>

      <Divider className='my-2' />

      {/* Tags Configuration Area */}
      <Card className='border-none bg-background shadow-none'>
        <CardHeader className='px-6 pt-6 pb-2 flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-semibold'>Gestión de Tags</h2>
            <p className='text-sm text-default-500 mt-1'>
              Organiza tus marcadores creando, editando o eliminando tags.
            </p>
          </div>
          <Button
            color='primary'
            size='sm'
            startContent={<Plus size={16} strokeWidth={3} />}
            onPress={handleCreateTag}
            className='font-semibold'
          >
            Nuevo tag
          </Button>
        </CardHeader>

        <CardBody className='px-6 py-6'>
          {isLoading ? (
            <div className='text-default-500'>Cargando tags...</div>
          ) : isError ? (
            <div className='text-danger'>Hubo un error al cargar los tags.</div>
          ) : tags.length === 0 ? (
            <div className='text-default-500 bg-default-50 rounded-lg p-4 text-center border border-default-200'>
              Aún no tienes tags creados. Empieza creando tu primer tag.
            </div>
          ) : (
            <div className='flex flex-wrap gap-2 items-center p-4 bg-default-50/50 rounded-lg border border-default-100'>
              {tags.map((tag) => (
                <ManageTagChip
                  key={tag.id}
                  tag={tag}
                  onEdit={handleEditTag}
                  onDelete={(id) => deleteTagMutation.mutate(id)}
                  isDeleting={deleteTagMutation.isPending && deleteTagMutation.variables === tag.id}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <Suspense fallback={null}>
        <CreateTagModal
          isOpen={isOpen}
          onOpenChange={() => {
            // Delay slightly clearing tagToEdit so modal animation doesn't pop
            setTimeout(() => setTagToEdit(undefined), 300)
            onOpenChange()
          }}
          tagToEdit={tagToEdit}
        />
      </Suspense>
    </div>
  )
}

export default ProfilePage
