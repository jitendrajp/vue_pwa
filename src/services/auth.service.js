import api from './api'

export const register = payload =>
  api.post('/register', payload)

export const login = payload =>
  api.post('/login', payload)

export const logout = () =>
  api.post('/logout')

export const forgotPassword = payload =>
  api.post('/password/forgot', payload)

export const resetPassword = payload =>
  api.post('/password/reset', payload)

export const verifyEmail = payload =>
  api.post('/email/verify', payload)

export const resendVerification = () =>
  api.post('/email/resend')
