import { dbPromise } from './index'

export async function addToQueue(job) {
  const db = await dbPromise
  await db.add('queue', job)
}

export async function getQueue() {
  const db = await dbPromise
  return db.getAll('queue')
}

export async function removeFromQueue(id) {
  const db = await dbPromise
  await db.delete('queue', id)
}
