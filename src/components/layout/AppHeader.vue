<template>
  <header
      class="fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center justify-between
           backdrop-blur-xl bg-white/70 border-b border-white/30"
  >
    <div class="font-semibold text-lg">
      VuePWA
    </div>

    <button
        class="w-8 h-8 flex items-center justify-center rounded-full active:bg-black/5"
        @click="toggleDrawer"
    >
      ⋮
    </button>
  </header>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const toggleDrawer = () => {
  ui.toggleDrawer()
}
</script>
