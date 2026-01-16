import { defineStore } from 'pinia'
import {
  getVapidKey,
  subscribePush,
  unsubscribePush
} from '@/services/push.service'

function isPWAInstalled() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const base64Clean = (base64 + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = atob(base64Clean)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    pushEnabled: localStorage.getItem('pushEnabled') === '1'
  }),

  actions: {
    async enablePush() {
      if (!('serviceWorker' in navigator)) {
        throw new Error('Push is not supported on this device')
      }

      if (!isPWAInstalled()) {
        throw new Error(
          'Please install the app on your home screen to enable notifications'
        )
      }

      const permission = Notification.permission

      if (permission === 'denied') {
        throw new Error(
          'Notifications are blocked. Enable them in Safari settings.'
        )
      }

      if (permission !== 'granted') {
        const result = await Notification.requestPermission()
        if (result !== 'granted') return
      }

      const registration = await navigator.serviceWorker.ready

      const { data } = await getVapidKey()

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey)
      })

      await subscribePush(subscription)

      this.pushEnabled = true
      localStorage.setItem('pushEnabled', '1')
    },

    async disablePush() {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()

      if (sub) {
        await sub.unsubscribe()
        await unsubscribePush()
      }

      this.pushEnabled = false
      localStorage.removeItem('pushEnabled')
    }
  }
})
