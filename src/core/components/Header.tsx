import type { JSX } from 'react'
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from '@heroui/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useUserStore } from '../../features/user/stores/useUserStore'

const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme()
  const { user } = useUserStore((state) => state)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Navbar
      className='bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-sm'
      maxWidth='full'
    >
      <NavbarBrand>
        <div className='flex items-center cursor-pointer group'>
          <span className='font-extrabold text-2xl tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(0,111,238,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(0,111,238,0.5)] transition-all duration-300'>
            Tobimarks
          </span>
        </div>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'></NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button
            isIconOnly
            variant='light'
            onPress={toggleTheme}
            aria-label='Toggle theme'
            className='rounded-full hover:bg-content1/50 transition-colors'
          >
            {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' />}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <div className='p-1 border border-white/10 rounded-full shadow-sm cursor-pointer hover:border-white/20 transition-colors'>
            <Avatar
              showFallback
              fallback={<Skeleton className='flex rounded-full' />}
              name={user?.displayName}
              src={user?.avatarUrl || undefined}
              size='sm'
            />
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
