import { lazy, Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Separator, Spinner } from '@heroui/react'
import { useDisclosure } from '@heroui/use-disclosure'
import { useQuery } from '@tanstack/react-query'
import { Bookmark, Folder, LayoutDashboard, Plus, X } from 'lucide-react'

import {
  COLLECTION_COLORS,
  COLLECTION_ICONS,
} from '../../features/collections/constants/collectionVisuals'
import CollectionService from '../../features/collections/services/collectionService'
import { useSidebarStore } from '../stores/useSidebarStore'

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
  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsOpen)

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
    setIsSidebarOpen(false)
  }

  const handleCollectionNavigation = (collectionId: string) => {
    navigate(`/collections/${collectionId}`)
    setIsSidebarOpen(false)
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden transition-opacity border-none'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 w-72 h-[100dvh] lg:top-16 lg:w-64 lg:h-[calc(100vh-4rem)] bg-background border-r border-neutral-200 dark:border-neutral-900 px-3 pb-3 lg:p-3 flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className='flex items-center justify-between lg:hidden pt-4 pb-6'>
          <span className='font-extrabold text-2xl tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(0,111,238,0.3)]'>
            Tobimarks
          </span>
          <Button
            isIconOnly
            variant='ghost'
            onPress={() => setIsSidebarOpen(false)}
            aria-label='Close sidebar'
            className='-mr-2'
          >
            <X className='w-5 h-5' />
          </Button>
        </div>

        <nav className='space-y-1 lg:mt-0'>
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={isActive(item.href) ? 'primary' : 'ghost'}
              className={`w-full justify-start gap-3 h-9 text-foreground rounded-sm ${
                isActive(item.href) && 'font-semibold dark:bg-neutral-800 bg-neutral-200'
              }`}
              onPress={() => handleNavigation(item.href)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>

        <Separator className='my-4' />

        <div className='mb-4'>
          <h3 className='text-xs font-medium uppercase text-foreground tracking-wider mb-2 px-2'>
            Organización
          </h3>
          <nav className='space-y-1'>
            {organizationItems.map((item) => (
              <Button
                key={item.label}
                variant={isActive(item.href) ? 'primary' : 'ghost'}
                className={`w-full justify-start gap-3 h-9 text-foreground rounded-sm ${
                  isActive(item.href) && 'font-semibold dark:bg-neutral-800 bg-neutral-200'
                }`}
                onPress={() => handleNavigation(item.href)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <Separator className='my-4' />

        <div className='flex-1 flex flex-col min-h-0'>
          <div className='flex items-center justify-between mb-2 px-2'>
            <h3 className='text-xs font-medium uppercase text-foreground tracking-wider'>
              Tus Colecciones
            </h3>
            <Button
              isIconOnly
              size='sm'
              variant='ghost'
              className='hover:text-foreground h-6 w-6 rounded-sm'
              onPress={onCollectionOpen}
            >
              <Plus size={14} strokeWidth={2} />
            </Button>
          </div>

          <div className='space-y-1 overflow-y-auto no-scrollbar flex-1'>
            {isLoadingCollections ? (
              <div className='flex justify-center py-4'>
                <Spinner size='sm' color='accent' />
              </div>
            ) : (
              collections.map((collection) => {
                const Icon = COLLECTION_ICONS[collection.icon || 'folder']
                const colorScheme = COLLECTION_COLORS[collection.color || 'blue']
                const isCollectionActive = isActive(`/collections/${collection.id}`)

                return (
                  <Button
                    key={collection.id}
                    variant='ghost'
                    className={`w-full justify-start gap-2 h-8 px-2 text-foreground rounded-sm hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 group ${
                      isCollectionActive && 'bg-neutral-200 dark:bg-neutral-800 font-semibold'
                    }`}
                    onPress={() => handleCollectionNavigation(collection.id)}
                  >
                    <div
                      className={`px-2 py-1 rounded-md ${colorScheme.lightBg} ${colorScheme.text} flex-shrink-0`}
                    >
                      <Icon size={14} strokeWidth={2} />
                    </div>
                    <span className='flex-1 text-left truncate text-xs text-foreground/80 group-hover:text-foreground transition-colors'>
                      {collection.name}
                    </span>
                    <span className='text-[10px] text-neutral-400 font-medium group-hover:text-foreground transition-colors'>
                      {collection.bookmarksCount}
                    </span>
                  </Button>
                )
              })
            )}
          </div>
        </div>

        <div className='mt-auto pt-4'>
          <Button
            className='w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-sm'
            onPress={onOpen}
          >
            <Plus size={16} strokeWidth={4} />
            Nuevo Marcador
          </Button>
          <Suspense fallback={null}>
            <CreateBookmarkModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <CreateCollectionModal isOpen={isCollectionOpen} onClose={onCollectionClose} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Sidebar
