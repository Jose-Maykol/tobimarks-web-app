import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, useOverlayState } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { FolderPlus } from 'lucide-react'

import CollectionCard from '../../components/CollectionCard'
import CreateCollectionModal from '../../components/CreateCollectionModal'
import DeleteCollectionModal from '../../components/DeleteCollectionModal'
import UpdateCollectionModal from '../../components/UpdateCollectionModal'
import CollectionService from '../../services/collectionService'
import type { Collection } from '../../types/collection.type'

const CollectionsPage = () => {
  const createOverlay = useOverlayState()
  const updateOverlay = useOverlayState()
  const deleteOverlay = useOverlayState()
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [collectionToDelete, setCollectionToDelete] = useState<Collection | null>(null)

  const {
    data: collections = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['collections'],
    queryFn: () => CollectionService.getList(),
  })

  const handleEdit = (collection: Collection) => {
    setSelectedCollection(collection)
    updateOverlay.open()
  }

  const navigate = useNavigate()

  const handleCardClick = (collection: Collection) => {
    navigate(`/collections/${collection.id}`)
  }

  const handleDelete = (collection: Collection) => {
    setCollectionToDelete(collection)
    deleteOverlay.open()
  }

  return (
    <div className='flex flex-col gap-6 w-full max-w-5xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-3xl font-bold tracking-tight'>Tus Colecciones</h2>
          <p className='text-neutral-500 text-sm'>
            Organiza tus marcadores y agrupa los recursos relacionados.
          </p>
        </div>
        <Button variant='primary' className='rounded-md' onPress={createOverlay.open}>
          <FolderPlus className='size-4' />
          Nueva Colección
        </Button>
      </div>

      {isLoading ? (
        <div className='py-32 flex justify-center text-neutral-400'>Cargando colecciones...</div>
      ) : isError ? (
        <div className='py-16 text-center text-danger'>
          Error al cargar colecciones: {(error as Error).message}
        </div>
      ) : collections.length === 0 ? (
        <div className='py-32 flex flex-col items-center justify-center text-center text-neutral-500 bg-content1/10 rounded-2xl border border-dashed border-divider'>
          <FolderPlus className='size-12 mb-4 text-neutral-400' />
          <p className='text-lg font-medium text-foreground'>Aún no tienes colecciones</p>
          <p className='text-sm mt-1 max-w-xs'>
            Crea tu primera colección para empezar a organizar tus marcadores de forma más
            eficiente.
          </p>
          <Button variant='secondary' className='mt-6 rounded-md' onPress={createOverlay.open}>
            <FolderPlus className='size-4' />
            Crear primera colección
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {collections.map((collection: Collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

      <CreateCollectionModal isOpen={createOverlay.isOpen} onClose={createOverlay.close} />

      <UpdateCollectionModal
        isOpen={updateOverlay.isOpen}
        onClose={updateOverlay.close}
        collection={selectedCollection}
      />

      <DeleteCollectionModal
        isOpen={deleteOverlay.isOpen}
        onClose={() => {
          deleteOverlay.close()
          setCollectionToDelete(null)
        }}
        collection={collectionToDelete}
      />
    </div>
  )
}

export default CollectionsPage
