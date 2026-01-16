<template>
  <div class="min-h-screen bg-transparent text-gray-900">
    <router-view />
    <Toast />
    <AddToHome />
  </div>
</template>

<script setup>
import Toast from '@/components/ui/Toast.vue'
import AddToHome from '@/components/ui/AddToHome.vue'

</script>

<style>
html,
body {
  background: transparent;
}
</style>
