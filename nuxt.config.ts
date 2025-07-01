// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer : {
    port : 8080
  },
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons',
    'pinia-plugin-persistedstate/nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/transitions.css',
  ],
  app: {
    head: {
      title: 'IVukat',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    // Global middleware'i aktif et
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
    }
  }
})