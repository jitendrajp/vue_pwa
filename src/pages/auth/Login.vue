<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <div
        class="w-full max-w-sm p-6 rounded-2xl
             backdrop-blur-xl bg-white/80 border border-white/30 shadow-lg"
    >
      <h1 class="text-xl font-semibold mb-4">
        {{ $t('common.login') }}
      </h1>

      <div v-if="offline" class="mb-3 text-sm text-red-600">
        Internet connection required to login.
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <input
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
            class="w-full p-3 rounded-xl border"
        />

        <input
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
            class="w-full p-3 rounded-xl border"
        />

        <button
            class="w-full py-3 rounded-xl bg-black text-white disabled:opacity-50"
            :disabled="offline || loading"
        >
          Login
        </button>
      </form>

      <div class="mt-4 flex justify-between text-sm">
        <button @click="$router.push({ name: 'forgot' })">
          Forgot password?
        </button>

        <button @click="$router.push({ name: 'register' })">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const ui = useUIStore()
const router = useRouter()

const loading = ref(false)

const offline = computed(() => ui.offline)

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  if (offline.value) return

  loading.value = true
  try {
    await auth.login(form)

    if (auth.user?.is_admin) {
      router.push({ name: 'admin.push' })
    } else {
      router.push({ name: 'home' })
    }
  } finally {
    loading.value = false
  }
}
</script>
