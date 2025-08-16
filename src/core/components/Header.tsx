import type { JSX } from 'react'
import { Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { Bookmark, Moon, Search, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme()

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
          <div className='w-8 h-8 bg-primary flex items-center justify-center'>
            <Bookmark className='w-5 h-5 text-primary-foreground' size={20} strokeWidth={1.5} />
          </div>
          <span className='font-bold text-xl text-foreground'>Tobimarks</span>
        </div>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Input
            placeholder='Search bookmarks, sites, collections...'
            className='w-96 text-foreground'
            startContent={
              <Search className='w-4 h-4 text-foreground' size={16} strokeWidth={1.5} />
            }
          />
        </NavbarItem>
      </NavbarContent>
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
      </NavbarContent>
    </Navbar>
  )
}

export default Header
