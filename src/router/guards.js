import { useAuthStore } from '@/stores/auth'

export function authGuard() {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    return { name: 'login' }
  }
}

export function guestGuard() {
  const auth = useAuthStore()

  if (auth.isAuthenticated) {
    if (auth.user?.is_admin) {
      return { name: 'admin.push' }
    }
    return { name: 'home' }
  }
}

export function adminGuard() {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (!auth.user?.is_admin) {
    return { name: 'home' }
  }
}
