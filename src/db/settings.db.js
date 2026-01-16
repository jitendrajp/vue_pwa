import { dbPromise } from './index'

export async function saveSetting(key, value) {
  const db = await dbPromise
  await db.put('settings', value, key)
}

export async function getSetting(key) {
  const db = await dbPromise
  return db.get('settings', key)
}
