<template>
  <header class="backdrop-blur bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border-b border-gray-800 shadow-lg sticky top-0 z-30">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo / Başlık -->
      <div @click="router.push('/dashboard')" class="flex items-center gap-2 cursor-pointer">
        <LucideShield class="w-7 h-7 text-indigo-400" />
        <span class="text-xl font-bold text-gray-100 tracking-wide">IVUKAT</span>
      </div>
      <!-- Orta: Sayfa başlığı veya arama -->
      <div class="hidden md:flex items-center">
        <div class="relative">
          <div class="relative">
            <input
              type="text"
              placeholder="Dosya arama…"
              class="pl-10 pr-10 py-2 rounded-full bg-gray-800/80 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-96  shadow"
              @input="searchHandler"
              v-model="search"
              ref="searchInput"
            />
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <LucideSearch class="w-5 h-5" />
            </span>
            <div @click="clearText($event)" v-if="search" class="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              <LucideX :size="14" class="text-indigo-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <!-- Sağ: Kullanıcı menüsü -->
      <div class="flex items-center gap-4">
        <button class="relative group">
          <LucideBell class="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition" />
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>
        <div class="flex items-center gap-2 bg-gray-800/80 px-3 py-1 rounded-full shadow border border-gray-700">
          <LucideUser class="w-5 h-5 text-indigo-400" />
          <span class="text-gray-200 text-sm font-semibold">{{ auth?.session?.firstName }} {{ auth?.session?.middleName }} {{ auth.session?.lastName }}</span>
        </div>
        <button
          @click="auth.logout"
          class="ml-2 px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition"
        >
          Çıkış
        </button>
      </div>
    </div>
  </header>
  <searchModal :visible="searchModalVisible" :cases="cases" @close="searchModalVisible = false" @select="goToCase" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { LucideShield, LucideUser, LucideBell, LucideSearch, LucideX } from 'lucide-vue-next'
import searchModal from './searchModal.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const search = ref<string>('')
const searchModalVisible = ref(false)
const cases = ref<any[]>([])
let searchTimeout: NodeJS.Timeout | null = null

const searchInput = ref<HTMLInputElement>()

const clearText = (e: Event) => {
    e.preventDefault()
    search.value = ''
}

watch(route, () => {
    search.value = ''
    cases.value = []
    searchModalVisible.value = false
})


const goToCase = (caseNo: string) => {
  router.push(`/cases/${encodeURIComponent(caseNo)}/case-info`)
}

const searchHandler = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Eğer arama değeri 4 karakterden azsa veya boşsa, timeout'u temizle ve döndür
  if (search.value.length < 4 || !search.value.trim()) {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      searchTimeout = null
    }
    return
  }

  searchTimeout = setTimeout(async () => {
    try {
      let replaceText = search.value.replace(/\s/g, "")
      let data = {
        searchText: replaceText.toLowerCase(),
        userId: auth?.session?.id
      }
      const result = await apiRequest('post', '/cases/search-case', data)
      cases.value = result.data.data
      searchModalVisible.value = true
    } catch (error) {
      console.log(error)
    }
  }, 300)
}




</script>
