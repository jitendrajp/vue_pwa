import { defineStore } from 'pinia'
import api from '@/services/api'
import {
  addToQueue,
  getQueue,
  removeFromQueue
} from '@/db/queue.db'

export const useOfflineQueueStore = defineStore('offlineQueue', {
  state: () => ({
    syncing: false
  }),

  actions: {
    async enqueue(job) {
      await addToQueue(job)
    },

    async sync() {
      if (!navigator.onLine || this.syncing) return

      this.syncing = true

      const queue = await getQueue()

      for (const job of queue) {
        try {
          await api({
            method: job.method,
            url: job.url,
            data: job.data
          })

          await removeFromQueue(job.id)
        } catch (e) {
          // stop on first failure to preserve order
          break
        }
      }

      this.syncing = false
    }
  }
})
