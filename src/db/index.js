import { openDB } from 'idb'

export const dbPromise = openDB('vue-pwa-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('user')) {
      db.createObjectStore('user')
    }

    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings')
    }

    if (!db.objectStoreNames.contains('queue')) {
      db.createObjectStore('queue', {
        keyPath: 'id',
        autoIncrement: true
      })
    }
  }
})

export async function clearAllDB() {
  const db = await dbPromise
  await Promise.all([
    db.clear('user'),
    db.clear('settings'),
    db.clear('queue')
  ])
}
