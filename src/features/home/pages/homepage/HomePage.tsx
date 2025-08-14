import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { GoogleLogin } from '@react-oauth/google'

const HomePage = () => {
  const handleLoginSuccess = async (credentialResponse) => {
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
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar className='bg-background/80 backdrop-blur-md border-b border-border' maxWidth='full'>
        <NavbarBrand>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
              <svg
                className='w-5 h-5 text-primary-foreground'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z' />
              </svg>
            </div>
            <span className='font-bold text-xl text-foreground'>Tobimarks</span>
          </div>
        </NavbarBrand>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Input
              placeholder='Buscar marcadores, sitios, colecciones...'
              className='w-96'
              startContent={
                <svg
                  className='w-4 h-4 text-muted-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              }
            />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className=''>TOBIMARKS 🚀</div>
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login failed')} />
    </div>
  )
}

export default HomePage
