import { dbPromise } from './index'

export async function saveUser(user) {
  const db = await dbPromise
  await db.put('user', user, 'profile')
}

export async function getUser() {
  const db = await dbPromise
  return db.get('user', 'profile')
}

export async function clearUser() {
  const db = await dbPromise
  await db.delete('user', 'profile')
}
