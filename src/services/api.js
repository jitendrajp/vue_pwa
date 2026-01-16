import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach access token
api.interceptors.request.use(config => {
  const auth = useAuthStore()

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

// Handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const auth = useAuthStore()

    if (
      error.response &&
      error.response.status === 401 &&
      auth.refreshToken
    ) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE}/token/refresh`,
          { refresh_token: auth.refreshToken }
        )

        auth.token = data.token

        error.config.headers.Authorization = `Bearer ${data.token}`
        return api.request(error.config)
      } catch (e) {
        auth.logout()
      }
    }

    return Promise.reject(error)
  }
)

export default api
