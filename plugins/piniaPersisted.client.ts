import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // Explicitly cast nuxtApp.$pinia to Pinia to avoid type error
  (nuxtApp.$pinia as import('pinia').Pinia).use(piniaPluginPersistedstate)
})