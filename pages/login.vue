<template>
    <div class="min-h-screen flex bg-gradient-to-b from-gray-900 to-black">
      <!-- Sol Taraf - Görsel Alan -->
      <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 items-center justify-center p-12">
        <div class="max-w-lg text-white">
          <h1 class="text-5xl font-bold mb-6">Ivukat</h1>
          <p class="text-xl text-gray-300 mb-8">Hukuk dünyasında dijital çözümler</p>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-white">Güvenli Erişim</h3>
                <p class="text-sm text-gray-300">Verileriniz güvende</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-white">Hızlı İşlem</h3>
                <p class="text-sm text-gray-300">Anında erişim</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-white">Özelleştirilebilir</h3>
                <p class="text-sm text-gray-300">İhtiyaçlarınıza göre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Sağ Taraf - Login Formu -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <!-- Mobil Logo -->
          <div class="lg:hidden text-center mb-8">
            <h1 class="text-3xl font-bold text-cyan-500">Ivukat</h1>
          </div>
  
          <div class="text-center mb-8">
            <h2 class="text-2xl font-semibold text-white">Hoş Geldiniz</h2>
            <p class="text-gray-300 mt-2">Hesabınıza giriş yapın</p>
          </div>
  
          <!-- Hata Mesajı -->
          <div v-if="loginErr != ''" class="mb-6 p-4 rounded-lg bg-red-900/50 border border-red-800">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-200">{{ loginErr }}</p>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    @click="loginErr = ''"
                    class="inline-flex rounded-md p-1.5 text-red-400 hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span class="sr-only">Kapat</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <div>
                
                <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Kullanıcı Adı</label>
                <div class="relative">
                    <input placeholder="Kullanıcı adınızı girin" class="input-item" v-model="username" type="text">
                </div>
              </div>
  
              <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Şifre</label>
                <div class="relative">
                    <input placeholder="Kullanıcı adınızı girin" class="input-item" v-model="password" type="password">
                </div>
              </div>
            </div>
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  :disabled="isLoading"
                  class="input-item"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-300 whitespace-nowrap">
                  Beni hatırla
                </label>
              </div>
  
              <a href="#" class="text-sm font-medium text-cyan-500 hover:text-cyan-400">
                Şifremi unuttum
              </a>
            </div>
  
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}
            </button>
  
            <div class="text-center">
              <p class="text-sm text-gray-400">
                Hesabınız yok mu?
                <router-link to="/register" class="font-medium text-cyan-500 hover:text-cyan-400">
                  Kayıt ol
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">

definePageMeta({
  layout: 'default'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiRequest } from '@/utils/axiosService'

const username = ref('')
const password = ref('')

const isLoading = ref<boolean>(false)
const loginErr = ref<string>('')
const router = useRouter()
const auth = useAuthStore()


const handleLogin = async () => {
    const response = await auth.login({username : username.value, password : password.value});
    if(response?.data.success){
      router.push('/dashboard')
    }
}
</script>
