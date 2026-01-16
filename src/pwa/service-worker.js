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
