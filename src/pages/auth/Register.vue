<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <div
        class="w-full max-w-sm p-6 rounded-2xl
             backdrop-blur-xl bg-white/80 border border-white/30 shadow-lg"
    >
      <h1 class="text-xl font-semibold mb-4">
        Register
      </h1>

      <div v-if="offline" class="mb-3 text-sm text-red-600">
        Internet connection required to register.
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="form.name" placeholder="Name" required class="w-full p-3 rounded-xl border" />
        <input v-model="form.email" type="email" placeholder="Email" required class="w-full p-3 rounded-xl border" />
        <input v-model="form.password" type="password" placeholder="Password" required class="w-full p-3 rounded-xl border" />

        <button
            class="w-full py-3 rounded-xl bg-black text-white disabled:opacity-50"
            :disabled="offline"
        >
          Register
        </button>
      </form>

      <div class="mt-4 text-sm text-center">
        <button @click="$router.push({ name: 'login' })">
          Back to login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import { register } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const ui = useUIStore()
const router = useRouter()

const offline = computed(() => ui.offline)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const submit = async () => {
  if (offline.value) return

  await register(form)
  router.push({ name: 'login' })
}
</script>
