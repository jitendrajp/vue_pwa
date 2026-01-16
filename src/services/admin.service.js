import api from './api'

export const sendPushNotification = payload =>
  api.post('/admin/push', payload)
