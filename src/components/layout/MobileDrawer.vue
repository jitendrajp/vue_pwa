<template>
  <div v-if="ui.drawerOpen" class="fixed inset-0 z-40">
    <div
        class="absolute inset-0 bg-black/20"
        @click="ui.toggleDrawer()"
    />

    <aside
        class="absolute top-0 right-0 h-full w-64 p-4
             backdrop-blur-xl bg-white/80 shadow-xl"
    >
      <nav class="space-y-4">
        <DrawerItem name="home" label="Home" />
        <DrawerItem name="profile" label="Profile" />

        <DrawerItem
            v-if="auth.user?.is_admin"
            name="admin.push"
            label="Admin"
        />

        <button
            class="w-full text-left text-red-600"
            @click="logout"
        >
          Logout
        </button>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const ui = useUIStore()
const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  ui.toggleDrawer()
  router.push({ name: 'login' })
}

const DrawerItem = {
  props: ['name', 'label'],
  template: `
    <button
      class="w-full text-left"
      @click="$router.push({ name })"
    >
      {{ label }}
    </button>
  `
}
</script>
