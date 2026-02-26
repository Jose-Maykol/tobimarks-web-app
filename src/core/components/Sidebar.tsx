import { lazy, Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Divider, Spinner, useDisclosure } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { Bookmark, Folder, LayoutDashboard, Plus, User } from 'lucide-react'

import CollectionService from '../../features/collections/services/collectionService'

const menuItems = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
    href: '/',
  },
  {
    label: 'Marcadores',
    icon: <Bookmark size={20} strokeWidth={1.5} />,
    href: '/bookmarks',
  },
  {
    label: 'Perfil',
    icon: <User size={20} strokeWidth={1.5} />,
    href: '/profile',
  },
]

const organizationItems = [
  {
    label: 'Colecciones',
    icon: <Folder size={20} strokeWidth={1.5} />,
    href: '/collections',
  },
]

const CreateBookmarkModal = lazy(
  () => import('../../features/bookmarks/components/CreateBookmarkModal')
)
const CreateCollectionModal = lazy(
  () => import('../../features/collections/components/CreateCollectionModal')
)

const Sidebar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isCollectionOpen,
    onOpen: onCollectionOpen,
    onClose: onCollectionClose,
  } = useDisclosure()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: collections = [], isLoading: isLoadingCollections } = useQuery({
    queryKey: ['collections'],
    queryFn: () => CollectionService.getList(),
  })

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const handleCollectionNavigation = (collectionId: string) => {
    navigate(`/collections/${collectionId}`)
  }

  return (
    <div className='fixed w-64 h-screen max-h-[calc(100vh-4rem)] bg-background border-r border-border border-neutral-200  dark:border-neutral-900 p-4 flex flex-col'>
      <nav className='space-y-1'>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={isActive(item.href) ? 'solid' : 'light'}
            className={`w-full justify-start gap-3 h-10 text-foreground ${
              isActive(item.href) && 'font-semibold dark:bg-neutral-800 bg-neutral-200'
            }`}
            startContent={item.icon}
            onPress={() => handleNavigation(item.href)}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      <Divider className='my-4' />

      <div className='mb-4'>
        <h3 className='text-xs font-medium uppercase text-foreground tracking-wider mb-2 px-2'>
          Organización
        </h3>
        <nav className='space-y-1'>
          {organizationItems.map((item) => (
            <Button
              key={item.label}
              variant={isActive(item.href) ? 'solid' : 'light'}
              className={`w-full justify-start gap-3 h-10 text-foreground ${
                isActive(item.href) && 'font-semibold dark:bg-neutral-800 bg-neutral-200'
              }`}
              startContent={item.icon}
              onPress={() => handleNavigation(item.href)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <Divider className='my-4' />

      <div className='flex-1'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-medium text-foreground'>Colecciones</h3>
          <Button
            size='sm'
            variant='light'
            className='hover:text-foreground min-w-0 w-6 h-6 p-0'
            onPress={onCollectionOpen}
          >
            <Plus size={16} strokeWidth={1.5} />
          </Button>
        </div>

        <div className='space-y-1 overflow-y-auto no-scrollbar max-h-48'>
          {isLoadingCollections ? (
            <div className='flex justify-center py-4'>
              <Spinner size='sm' color='primary' />
            </div>
          ) : (
            collections.map((collection) => (
              <Button
                key={collection.id}
                variant='light'
                className={`w-full justify-start gap-3 h-10 hover:text-foreground hover:bg-muted/50 ${
                  isActive(`/collections/${collection.id}`) &&
                  'font-semibold dark:bg-neutral-800 bg-neutral-200'
                }`}
                startContent={<div className='w-3 h-3 rounded-full bg-neutral-400' />}
                onPress={() => handleCollectionNavigation(collection.id)}
              >
                <span className='flex-1 text-left truncate'>{collection.name}</span>
                <span className='text-xs'>{collection.bookmarksCount}</span>
              </Button>
            ))
          )}
        </div>
      </div>

      <div className='mt-auto pt-4'>
        <Button
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold'
          startContent={<Plus size={16} strokeWidth={4} />}
          onPress={onOpen}
        >
          Nuevo Marcador
        </Button>
        <Suspense fallback={null}>
          <CreateBookmarkModal isOpen={isOpen} onOpenChange={onOpenChange} />
          <CreateCollectionModal isOpen={isCollectionOpen} onClose={onCollectionClose} />
        </Suspense>
      </div>
    </div>
  )
}

export default Sidebar
