<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">
      Profile
    </h1>

    <div
        class="p-4 rounded-2xl
             backdrop-blur-xl bg-white/80 border border-white/30 shadow"
    >
      <form @submit.prevent="save" class="space-y-4">
        <input
            v-model="form.name"
            placeholder="Name"
            class="w-full p-3 rounded-xl border"
        />

        <select
            v-model="form.language"
            class="w-full p-3 rounded-xl border"
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>

        <button
            class="w-full py-3 rounded-xl bg-black text-white"
        >
          Save
        </button>
      </form>

      <p v-if="offline" class="mt-2 text-sm text-yellow-600">
        Saved offline. Will sync automatically.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useOfflineQueueStore } from '@/stores/offlineQueue'
import { useUIStore } from '@/stores/ui'
import { saveUser } from '@/db/user.db'
import { updateMe } from '@/services/user.service'

const userStore = useUserStore()
const queue = useOfflineQueueStore()
const ui = useUIStore()

const offline = computed(() => ui.offline)

const form = reactive({
  name: '',
  language: 'en'
})

onMounted(async () => {
  if (userStore.profile) {
    form.name = userStore.profile.name
    form.language = userStore.profile.language || 'en'
  }
})

const save = async () => {
  const payload = {
    name: form.name,
    language: form.language
  }

  if (offline.value) {
    await saveUser(payload)

    await queue.enqueue({
      method: 'PUT',
      url: '/me',
      data: payload
    })
  } else {
    await updateMe(payload)
  }

  userStore.setLanguage(form.language)
}
</script>
