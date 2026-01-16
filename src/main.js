import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'
import router from './router'
import i18n from './i18n'

import './styles/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Global online/offline detection
window.addEventListener('online', () => {
  window.dispatchEvent(new CustomEvent('app:online'))
})

window.addEventListener('offline', () => {
  window.dispatchEvent(new CustomEvent('app:offline'))
})

app.mount('#app')
