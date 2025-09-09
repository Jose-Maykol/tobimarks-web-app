import { createContext } from 'react'
import { useNavigate } from 'react-router'

import api from '../interceptors/auth.interceptor'

const AuthContext = createContext(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalUrl = error.config.url
      if (error.response?.status === 401 && originalUrl !== '/login') {
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}

export default AuthProvider
