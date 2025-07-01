import { useAuthStore } from '../stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  // Sadece auth layout gerektiren sayfalarda çalışsın
  
}) 