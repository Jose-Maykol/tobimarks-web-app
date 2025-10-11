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
      className='bg-background/80 backdrop-blur-md border-b border-border border-neutral-200  dark:border-neutral-900'
      maxWidth='full'
    >
      <NavbarBrand>
        <div className='flex items-center gap-2'>
          {/* <div className='w-8 h-8 flex items-center justify-center'>
            <Bookmark className='w-5 h-5 fill-sky-400 stroke-sky-500' size={20} strokeWidth={1.5} />
          </div> */}
          <span className='font-bold text-xl text-foreground'>Tobimarks</span>
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
            className='rounded-full'
          >
            {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5' />}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Avatar
            showFallback
            fallback={<Skeleton className='flex rounded-full' />}
            name={user?.displayName}
            src={user?.avatarUrl || undefined}
            size='sm'
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
