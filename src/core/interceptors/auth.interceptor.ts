import axios from 'axios'

import { API_URL } from '../config/env'
import { AUTH_TOKEN_KEY } from '../constants/storageKeys'

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

api.interceptors.request.use((config) => {
  if (config.url && !config.url.includes('/login')) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
  return config
})

export default api
