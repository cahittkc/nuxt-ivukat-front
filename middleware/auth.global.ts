import { useAuthStore } from '../stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  // Sadece auth layout gerektiren sayfalarda çalışsın
  if (to.meta.layout === 'auth') {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) {
      return navigateTo('/login')
    }
  }
}) 