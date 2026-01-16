<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <div
        class="w-full max-w-sm p-6 rounded-2xl
             backdrop-blur-xl bg-white/80 border border-white/30 shadow-lg"
    >
      <h1 class="text-xl font-semibold mb-4">
        Forgot Password
      </h1>

      <div v-if="offline" class="mb-3 text-sm text-red-600">
        Internet connection required.
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <input
            v-model="email"
            type="email"
            required
            placeholder="Email"
            class="w-full p-3 rounded-xl border"
        />

        <button
            class="w-full py-3 rounded-xl bg-black text-white disabled:opacity-50"
            :disabled="offline"
        >
          Send Reset Link
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
import { ref, computed } from 'vue'
import { useUIStore } from '@/stores/ui'
import { forgotPassword } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const ui = useUIStore()
const router = useRouter()

const offline = computed(() => ui.offline)
const email = ref('')

const submit = async () => {
  if (offline.value) return

  await forgotPassword({ email: email.value })
  router.push({ name: 'login' })
}
</script>
