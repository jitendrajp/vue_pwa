import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    drawerOpen: false,
    loading: false,
    offline: !navigator.onLine
  }),

  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
    },

    setLoading(value) {
      this.loading = value
    },

    setOffline(value) {
      this.offline = value
    }
  }
})
