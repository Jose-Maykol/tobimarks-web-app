import { BrowserRouter } from 'react-router'
import { HeroUIProvider } from '@heroui/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <HeroUIProvider>{children}</HeroUIProvider>
    </BrowserRouter>
  )
}

export default Providers
