import { lazy, Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button, Divider, useDisclosure } from '@heroui/react'
import { Archive, Bookmark, Folder, Heart, LayoutDashboard, Plus, Tag, User } from 'lucide-react'

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
    label: 'Favoritos',
    icon: <Heart size={20} strokeWidth={1.5} />,
    href: '/bookmarks?filter=favorites',
  },
  {
    label: 'Archivados',
    icon: <Archive size={20} strokeWidth={1.5} />,
    href: '/bookmarks?filter=archived',
  },
  {
    label: 'Perfil',
    icon: <User size={20} strokeWidth={1.5} />,
    href: '/profile',
  },
]

const organizationItems = [
  {
    label: 'Categorías',
    icon: <Folder size={20} strokeWidth={1.5} />,
    href: '/categories',
  },
  {
    label: 'Tags',
    icon: <Tag size={20} strokeWidth={1.5} />,
    href: '/tags',
  },
]

const collections = [
  { name: 'Desarrollo Web', count: 24, color: 'bg-blue-500', href: '/collections/desarrollo-web' },
  { name: 'Diseño UI/UX', count: 18, color: 'bg-purple-500', href: '/collections/diseno-ui-ux' },
  { name: 'Recursos', count: 12, color: 'bg-green-500', href: '/collections/recursos' },
]

const CreateBookmarkModal = lazy(
  () => import('../../features/bookmarks/components/CreateBookmarkModal')
)

const Sidebar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const handleCollectionNavigation = (collection: (typeof collections)[0]) => {
    navigate(collection.href)
  }

  return (
    <div className='fixed w-64 h-screen max-h-[calc(100vh-4rem)] bg-background border-r border-border border-neutral-200  dark:border-neutral-900 p-4 flex flex-col'>
      <nav className='space-y-1'>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={isActive(item.href) ? 'solid' : 'light'}
            color={isActive(item.href) ? 'primary' : 'default'}
            className={`w-full justify-start gap-3 h-10 text-foreground ${
              isActive(item.href) && 'font-semibold text-white'
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
              color={isActive(item.href) ? 'primary' : 'default'}
              className={`w-full justify-start gap-3 h-10 text-foreground ${
                isActive(item.href) && 'font-semibold text-white'
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
          <Button size='sm' variant='light' className=' hover:text-foreground min-w-0 w-6 h-6 p-0'>
            <Plus size={16} strokeWidth={1.5} />
          </Button>
        </div>

        <div className='space-y-1'>
          {collections.map((collection) => (
            <Button
              key={collection.name}
              variant='light'
              className='w-full justify-start gap-3 h-10 hover:text-foreground hover:bg-muted/50'
              startContent={<div className={`w-3 h-3 rounded-full ${collection.color}`} />}
              onPress={() => handleCollectionNavigation(collection)}
            >
              <span className='flex-1 text-left'>{collection.name}</span>
              <span className='text-xs '>{collection.count}</span>
            </Button>
          ))}
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
        </Suspense>
      </div>
    </div>
  )
}

export default Sidebar
