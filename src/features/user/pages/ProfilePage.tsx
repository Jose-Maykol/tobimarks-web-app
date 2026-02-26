import { lazy, Suspense, useState } from 'react'
import { Button, Card, CardBody, CardHeader, useDisclosure } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Tags } from 'lucide-react'

import ManageTagChip from '../../tags/components/ManageTagChip'
import TagService from '../../tags/services/tagService'
import type { TagListItem } from '../../tags/types/tags.type'
import UserAiSettings from '../components/UserAiSettings'
import UserProfileInfo from '../components/UserProfileInfo'

const CreateTagModal = lazy(() => import('../../tags/components/CreateTagModal'))

const ProfilePage = () => {
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
    <div className='max-w-6xl mx-auto flex flex-col gap-8 py-6 px-4 md:px-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold text-foreground tracking-tight'>
          Perfil y Configuración
        </h1>
        <p className='text-default-500'>
          Gestiona tu cuenta personal, preferencias y automatizaciones.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch'>
        <div className='lg:col-span-1 h-full'>
          <UserProfileInfo />
        </div>

        <div className='lg:col-span-2 h-full'>
          <UserAiSettings />
        </div>
      </div>

      <Card className='border-none bg-content1 shadow-md'>
        <CardHeader className='px-6 pt-6 pb-2 flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-semibold'>Gestión de Tags</h2>
            <p className='text-sm text-default-500 mt-1 max-w-xl'>
              Organiza tus marcadores de forma eficiente creando, editando y eliminando tags a nivel
              global del sistema.
            </p>
          </div>
          <Button
            color='primary'
            size='sm'
            startContent={<Plus size={16} strokeWidth={3} />}
            onPress={handleCreateTag}
            className='font-semibold shrink-0'
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
            <div className='text-default-500 bg-background rounded-xl p-8 text-center border border-divider shadow-sm'>
              <Tags size={32} className='mx-auto mb-3 text-neutral-300' />
              Aún no tienes tags creados. Empieza creando tu primer tag.
            </div>
          ) : (
            <div className='flex flex-wrap gap-2 items-center p-5 bg-background rounded-xl border border-divider shadow-sm'>
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
