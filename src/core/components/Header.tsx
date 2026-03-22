import type { JSX } from 'react'
import { Avatar, Button, Skeleton } from '@heroui/react'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useUserStore } from '../../features/user/stores/useUserStore'
import { useSidebarStore } from '../stores/useSidebarStore'

const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const { user } = useUserStore((state) => state)
  const toggleSidebar = useSidebarStore((state) => state.toggle)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/60 backdrop-blur-xl shadow-sm'>
      <header className='flex h-16 items-center justify-between px-6'>
        {/* Left section */}
        <div className='flex items-center gap-4'>
          <div className='lg:hidden'>
            <Button isIconOnly variant='ghost' onPress={toggleSidebar} aria-label='Open sidebar'>
              <Menu className='w-5 h-5' />
            </Button>
          </div>
          <div className='flex items-center cursor-pointer group'>
            <span className='font-extrabold text-2xl tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(0,111,238,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(0,111,238,0.5)] transition-all duration-300'>
              Tobimarks
            </span>
          </div>
        </div>

        {/* Right section */}
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

          <div className='p-1 border border-border rounded-full shadow-sm cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors'>
            <Avatar size='sm' className='size-8'>
              <Avatar.Image src={user?.avatarUrl || undefined} />
              <Avatar.Fallback className='bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold'>
                {user?.displayName?.charAt(0) || <Skeleton className='size-8 rounded-full' />}
              </Avatar.Fallback>
            </Avatar>
          </div>
        </div>
      </header>
    </nav>
  )
}

export default Header
