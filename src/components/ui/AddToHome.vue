<template>
  <div
      v-if="show"
      class="fixed bottom-4 left-4 right-4 z-50
           p-4 rounded-2xl
           backdrop-blur-xl bg-white/90 border border-white/30 shadow"
  >
    <p class="text-sm mb-2">
      Add this app to your home screen for a better experience.
    </p>

    <div class="flex gap-2">
      <button
          class="flex-1 py-2 rounded-xl bg-black text-white"
          @click="install"
      >
        Add
      </button>

      <button
          class="flex-1 py-2 rounded-xl bg-gray-200"
          @click="dismiss"
      >
        Later
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)
let deferredPrompt = null

onMounted(() => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    show.value = true
  })
})

const install = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  await deferredPrompt.userChoice
  deferredPrompt = null
  show.value = false
}

const dismiss = () => {
  show.value = false
}
</script>
