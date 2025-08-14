import { BrowserRouter } from 'react-router'
import { HeroUIProvider } from '@heroui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GOOGLE_CLIENT_ID } from './core/config/env'

const queryClient = new QueryClient()
const clientId = GOOGLE_CLIENT_ID

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default Providers
