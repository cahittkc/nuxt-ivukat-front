import { useAuthStore } from '../stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Eğer kullanıcı oturumu açılmamışsa ve login/register olmayan bir sayfaya gitmeye çalışıyorsa
  if (!auth.isLoggedIn && !['/login', '/register', '/'].includes(to.path)) {
    return navigateTo('/login')
  }

  // Eğer kullanıcı oturumu açılmışsa ve login/register sayfalarına gitmeye çalışıyorsa
  if (auth.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/dashboard')
  }  
}) 