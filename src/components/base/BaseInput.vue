<template>
  <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-3 rounded-xl border border-gray-300
           focus:outline-none focus:ring-2 focus:ring-black/20"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: { type: String, default: 'text' }
})

defineEmits(['update:modelValue'])
</script>
