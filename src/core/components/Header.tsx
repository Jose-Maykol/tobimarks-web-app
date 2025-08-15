import type { JSX } from 'react'
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { IconBookmark, IconSearch } from '@tabler/icons-react'

const Header = (): JSX.Element => {
  /* const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential

    console.log('ID Token:', idToken)

    // Enviar idToken directamente a tu backend
    const res = await fetch('https://tu-api.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    const data = await res.json()
    console.log('Usuario autenticado:', data)
  } */

  return (
    <Navbar className='bg-background/80 backdrop-blur-md border-b border-border' maxWidth='full'>
      <NavbarBrand>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
            <IconBookmark className='w-5 h-5 text-primary-foreground' size={20} stroke={1.5} />
          </div>
          <span className='font-bold text-xl text-foreground'>Tobimarks</span>
        </div>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Input
            placeholder='Search bookmarks, sites, collections...'
            className='w-96 text-foreground'
            startContent={<IconSearch className='w-4 h-4 text-foreground' size={16} stroke={1.5} />}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem />
      </NavbarContent>
    </Navbar>
  )
}

export default Header
