<template>
  <div class="min-h-screen bg-transparent">
    <AppHeader />
    <main class="p-4 pt-20">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
</script>
