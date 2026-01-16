<template>
  <div class="min-h-screen bg-transparent">
    <OfflineBanner />
    <AppHeader />
    <MobileDrawer />
    <main class="p-4 pt-20">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MobileDrawer from '@/components/layout/MobileDrawer.vue'
import OfflineBanner from '@/components/layout/OfflineBanner.vue'
</script>
