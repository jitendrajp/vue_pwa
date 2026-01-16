import api from './api'

export const getVapidKey = () => {
  return api.get('/push/vapid')
}

export const subscribePush = subscription => {
  return api.post('/push/subscribe', subscription)
}

export const unsubscribePush = () => {
  return api.post('/push/unsubscribe')
}
