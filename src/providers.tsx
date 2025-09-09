import { BrowserRouter } from 'react-router'
import { HeroUIProvider } from '@heroui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { GOOGLE_CLIENT_ID } from './core/config/env'
import AuthProvider from './core/providers/AuthProvider'

const queryClient = new QueryClient()
const clientId = GOOGLE_CLIENT_ID

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <NextThemesProvider attribute='class' defaultTheme='dark'>
              <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
            </NextThemesProvider>
          </HeroUIProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Providers
