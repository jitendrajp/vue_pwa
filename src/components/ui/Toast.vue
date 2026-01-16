<template>
  <div class="fixed bottom-4 left-0 right-0 z-50 flex flex-col items-center space-y-2">
    <div
        v-for="toast in notifications.toasts"
        :key="toast.id"
        class="px-4 py-2 rounded-xl text-sm shadow
             backdrop-blur-xl bg-white/90 border border-white/30"
        :class="typeClass(toast.type)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { useNotificationsStore } from '@/stores/notifications'

const notifications = useNotificationsStore()

const typeClass = type => {
  if (type === 'error') return 'text-red-600'
  if (type === 'success') return 'text-green-600'
  if (type === 'warning') return 'text-yellow-600'
  return 'text-gray-800'
}
</script>
