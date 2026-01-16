import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    toasts: []
  }),

  actions: {
    push(message, type = 'info') {
      this.toasts.push({
        id: Date.now(),
        message,
        type
      })
    },

    remove(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})
