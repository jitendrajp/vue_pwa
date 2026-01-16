import { defineStore } from 'pinia'
import api from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    language: 'en'
  }),

  getters: {
    isAdmin: state => !!state.profile?.is_admin
  },

  actions: {
    async fetchProfile() {
      const { data } = await api.get('/me')
      this.profile = data
      this.language = data.language || 'en'
    },

    async updateProfile(payload) {
      const { data } = await api.put('/me', payload)
      this.profile = data
    },

    setLanguage(lang) {
      this.language = lang
    }
  }
})
