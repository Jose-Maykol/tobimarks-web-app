import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Divider } from '@heroui/react'
import {
  IconArchive,
  IconBookmark,
  IconCategory,
  IconHeart,
  IconLayoutDashboard,
  IconPlus,
  IconTag,
  IconUser,
} from '@tabler/icons-react'

const menuItems = [
  {
    label: 'Dashboard',
    icon: <IconLayoutDashboard size={20} stroke={1.5} />,
    href: '/',
  },
  {
    label: 'Todos los Marcadores',
    icon: <IconBookmark size={20} stroke={1.5} />,
    href: '/bookmarks',
  },
  {
    label: 'Favoritos',
    icon: <IconHeart size={20} stroke={1.5} />,
    href: '/bookmarks?filter=favorites',
  },
  {
    label: 'Archivados',
    icon: <IconArchive size={20} stroke={1.5} />,
    href: '/bookmarks?filter=archived',
  },
  {
    label: 'Perfil',
    icon: <IconUser size={20} stroke={1.5} />,
    href: '/profile',
  },
]

const organizationItems = [
  {
    label: 'Categorías',
    icon: <IconCategory size={20} stroke={1.5} />,
    href: '/categories',
  },
  {
    label: 'Tags',
    icon: <IconTag size={20} stroke={1.5} />,
    href: '/tags',
  },
]

const collections = [
  { name: 'Desarrollo Web', count: 24, color: 'bg-blue-500', href: '/collections/desarrollo-web' },
  { name: 'Diseño UI/UX', count: 18, color: 'bg-purple-500', href: '/collections/diseno-ui-ux' },
  { name: 'Recursos', count: 12, color: 'bg-green-500', href: '/collections/recursos' },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const navigate = useNavigate()

  const handleNavigation = (item: (typeof menuItems)[0] | (typeof organizationItems)[0]) => {
    setActiveItem(item.label)
    navigate(item.href)
  }

  const handleCollectionNavigation = (collection: (typeof collections)[0]) => {
    navigate(collection.href)
  }

  return (
    <div className='fixed w-64 h-screen max-h-[calc(100vh-4rem)] bg-background border-r border-border p-4 flex flex-col'>
      {/* Navigation Menu */}
      <nav className='space-y-1'>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={activeItem === item.label ? 'flat' : 'light'}
            className={`w-full justify-start gap-3 h-10 ${
              activeItem === item.label
                ? 'bg-primary/10 text-primary'
                : 'hover:text-foreground hover:bg-muted/50'
            }`}
            startContent={item.icon}
            onPress={() => handleNavigation(item)}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      <Divider className='my-4' />

      {/* Organization section */}
      <div className='mb-4'>
        <h3 className='text-xs font-medium uppercase text-foreground tracking-wider mb-2 px-2'>
          Organización
        </h3>
        <nav className='space-y-1'>
          {organizationItems.map((item) => (
            <Button
              key={item.label}
              variant={activeItem === item.label ? 'flat' : 'light'}
              className={`w-full justify-start gap-3 h-10 ${
                activeItem === item.label
                  ? 'bg-primary/10 text-primary'
                  : ' hover:text-foreground hover:bg-muted/50'
              }`}
              startContent={item.icon}
              onPress={() => handleNavigation(item)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <Divider className='my-4' />

      {/* Collections */}
      <div className='flex-1'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-sm font-medium text-foreground'>Colecciones</h3>
          <Button size='sm' variant='light' className=' hover:text-foreground min-w-0 w-6 h-6 p-0'>
            <IconPlus size={16} stroke={1.5} />
          </Button>
        </div>

        <div className='space-y-1'>
          {collections.map((collection) => (
            <Button
              key={collection.name}
              variant='light'
              className='w-full justify-start gap-3 h-10  hover:text-foreground hover:bg-muted/50'
              startContent={<div className={`w-3 h-3 rounded-full ${collection.color}`} />}
              onPress={() => handleCollectionNavigation(collection)}
            >
              <span className='flex-1 text-left'>{collection.name}</span>
              <span className='text-xs '>{collection.count}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-auto pt-4 border-t border-border'>
        <Button
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
          startContent={<IconPlus size={16} stroke={3} />}
          onPress={() => navigate('/bookmarks?action=add')}
        >
          Nuevo Marcador
        </Button>
      </div>
    </div>
  )
}
