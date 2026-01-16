import { defineStore } from 'pinia'
import api from '@/services/api'
import { clearAllDB } from '@/db'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false
  }),

  actions: {
    async login(credentials) {
      const { data } = await api.post('/login', credentials)

      this.token = data.token
      this.refreshToken = data.refresh_token
      this.user = data.user
      this.isAuthenticated = true
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (_) {
        // ignore network errors
      }

      this.$reset()
      await clearAllDB()
    },

    setUser(user) {
      this.user = user
    }
  }
})
