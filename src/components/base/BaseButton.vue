<template>
  <button
      :type="type"
      :disabled="disabled"
      class="w-full py-3 rounded-xl font-medium transition
           active:scale-[0.98] disabled:opacity-50"
      :class="classes"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  disabled: Boolean
})

const classes = computed(() => {
  if (props.variant === 'secondary') {
    return 'bg-white/70 backdrop-blur-xl border border-white/30'
  }

  if (props.variant === 'danger') {
    return 'bg-red-600 text-white'
  }

  return 'bg-black text-white'
})
</script>
