import type { JSX } from 'react'
import { useNavigate } from 'react-router'
import { Avatar, Button, Dropdown, Separator, Skeleton } from '@heroui/react'
import { LogOut, Menu, Moon, Sun, User as UserIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import useAuthStore from '../../features/auth/store/useAuthStore'
import { useUserStore } from '../../features/user/stores/useUserStore'
import { useSidebarStore } from '../stores/useSidebarStore'

const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const { user } = useUserStore((state) => state)
  const { signOut } = useAuthStore()
  const toggleSidebar = useSidebarStore((state) => state.toggle)
  const navigate = useNavigate()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/60 backdrop-blur-xl'>
      <header className='flex h-16 items-center justify-between px-6'>
        <div className='flex items-center gap-4'>
          <div className='lg:hidden'>
            <Button isIconOnly variant='ghost' onPress={toggleSidebar} aria-label='Open sidebar'>
              <Menu className='w-5 h-5' />
            </Button>
          </div>
          <div className='flex items-center cursor-pointer group'>
            <span className='font-bold text-2xl tracking-tighter text-primary transition-all duration-300'>
              Tobimarks
            </span>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Button
            isIconOnly
            variant='ghost'
            onPress={toggleTheme}
            aria-label='Toggle theme'
            className='rounded-full hover:bg-content1/50 transition-colors'
          >
            {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' />}
          </Button>

          {user && (
            <Dropdown>
              <Dropdown.Trigger>
                <div className='p-1 border border-border rounded-full shadow-sm cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors'>
                  <Avatar size='sm' className='size-8'>
                    <Avatar.Image src={user.avatarUrl || undefined} />
                    <Avatar.Fallback className='bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold'>
                      {user.displayName?.charAt(0) || <Skeleton className='size-8 rounded-full' />}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover
                placement='bottom end'
                className='min-w-[240px] rounded-md border border-divider shadow-2xl p-1 bg-background/80 backdrop-blur-md'
              >
                <Dropdown.Menu aria-label='User Actions'>
                  <Dropdown.Item
                    id='profile'
                    className='h-auto py-3 px-4 gap-1 bg-transparent cursor-default pointer-events-none hover:bg-transparent'
                  >
                    <div className='flex flex-col min-w-0'>
                      <p className='font-bold text-foreground truncate text-sm'>
                        {user.displayName || 'Usuario'}
                      </p>
                      <p className='text-xs text-muted-foreground truncate'>{user.email}</p>
                    </div>
                  </Dropdown.Item>

                  <Separator className='my-1' />

                  <Dropdown.Item
                    id='my-profile'
                    onPress={() => navigate('/profile')}
                    className='rounded-lg hover:bg-content1/80 transition-all duration-200 py-2'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-1.5 rounded-md bg-content2'>
                        <UserIcon className='size-4 text-muted-foreground' />
                      </div>
                      <span className='text-sm font-medium'>Mi Perfil</span>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id='logout'
                    onPress={signOut}
                    className='rounded-lg hover:bg-danger/10 text-danger transition-all duration-200 py-2'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='p-1.5 rounded-md bg-danger/10'>
                        <LogOut className='size-4' />
                      </div>
                      <span className='text-sm font-bold'>Cerrar sesión</span>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </header>
    </nav>
  )
}

export default Header
