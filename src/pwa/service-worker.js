const CACHE_NAME = 'vue-pwa-cache-v1'
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        OFFLINE_URL
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  const { request } = event

  // API GET caching
  if (
    request.method === 'GET' &&
    request.url.includes('/api/')
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Default fallback
  event.respondWith(
    fetch(request).catch(() => {
      if (request.mode === 'navigate') {
        return caches.match(OFFLINE_URL)
      }
    })
  )
})

self.addEventListener('push', event => {
  const data = event.data?.json() || {}

  const title = data.title || 'Notification'
  const options = {
    body: data.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: {
      url: data.url || '/'
    }
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  const url = event.notification.data.url

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus()
          }
        }
        return clients.openWindow(url)
      })
  )
})
