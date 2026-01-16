import { defineStore } from 'pinia'
import api from '@/services/api'

export const useOfflineQueueStore = defineStore('offlineQueue', {
  state: () => ({
    queue: []
  }),

  actions: {
    enqueue(job) {
      this.queue.push(job)
    },

    async sync() {
      if (!navigator.onLine || !this.queue.length) return

      const remaining = []

      for (const job of this.queue) {
        try {
          await api({
            method: job.method,
            url: job.url,
            data: job.data
          })
        } catch (e) {
          remaining.push(job)
        }
      }

      this.queue = remaining
    }
  }
})
