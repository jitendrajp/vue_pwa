<template>
  <div
      v-if="ui.offline"
      class="fixed top-14 left-0 right-0 z-40
           bg-yellow-400 text-black text-center py-1 text-sm"
  >
    You are offline. Changes will sync automatically.
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
const ui = useUIStore()
</script>
