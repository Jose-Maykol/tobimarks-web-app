import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Divider } from '@heroui/react'

const menuItems = [
  {
    label: 'Dashboard',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z'
        />
      </svg>
    ),
    href: '/',
  },
  {
    label: 'Todos los Marcadores',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
        />
      </svg>
    ),
    href: '/bookmarks',
  },
  {
    label: 'Favoritos',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        />
      </svg>
    ),
    href: '/bookmarks?filter=favorites',
  },
  {
    label: 'Archivados',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 8l6 6 6-6' />
      </svg>
    ),
    href: '/bookmarks?filter=archived',
  },
  {
    label: 'Perfil',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        />
      </svg>
    ),
    href: '/profile',
  },
]

const organizationItems = [
  {
    label: 'Categorías',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        />
      </svg>
    ),
    href: '/categories',
  },
  {
    label: 'Tags',
    icon: (
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
        />
      </svg>
    ),
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
    <div className='w-64 h-screen bg-background border-r border-border p-4 flex flex-col'>
      {/* Navigation Menu */}
      <nav className='space-y-1'>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={activeItem === item.label ? 'flat' : 'light'}
            className={`w-full justify-start gap-3 h-10 ${
              activeItem === item.label
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
        <h3 className='text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2'>
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
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
          <Button
            size='sm'
            variant='light'
            className='text-muted-foreground hover:text-foreground min-w-0 w-6 h-6 p-0'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </Button>
        </div>

        <div className='space-y-1'>
          {collections.map((collection) => (
            <Button
              key={collection.name}
              variant='light'
              className='w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50'
              startContent={<div className={`w-3 h-3 rounded-full ${collection.color}`} />}
              onPress={() => handleCollectionNavigation(collection)}
            >
              <span className='flex-1 text-left'>{collection.name}</span>
              <span className='text-xs text-muted-foreground'>{collection.count}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-auto pt-4 border-t border-border'>
        <Button
          className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
          startContent={
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          }
          onPress={() => navigate('/bookmarks?action=add')}
        >
          Nuevo Marcador
        </Button>
      </div>
    </div>
  )
}
