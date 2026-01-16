import api from './api'

export const fetchMe = () =>
  api.get('/me')

export const updateMe = payload =>
  api.put('/me', payload)
