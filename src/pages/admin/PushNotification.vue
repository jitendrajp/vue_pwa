<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">
      Send Push Notification
    </h1>

    <div
        class="p-4 rounded-2xl
             backdrop-blur-xl bg-white/80 border border-white/30 shadow"
    >
      <form @submit.prevent="send" class="space-y-4">
        <textarea
            v-model="message"
            placeholder="Notification message"
            class="w-full p-3 rounded-xl border"
        />

        <button
            class="w-full py-3 rounded-xl bg-black text-white"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendPushNotification } from '@/services/admin.service'

const message = ref('')

const send = async () => {
  if (!message.value) return

  await sendPushNotification({
    message: message.value
  })

  message.value = ''
}
</script>
