<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div
        class="absolute inset-0 bg-black/30"
        @click="$emit('close')"
    />

    <div
        class="relative w-11/12 max-w-sm p-4 rounded-2xl
             backdrop-blur-xl bg-white/90 border border-white/30"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>
