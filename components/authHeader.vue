<template>
  <header class="backdrop-blur bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border-b border-gray-700 shadow-lg sticky top-0 z-30">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo / Başlık -->
      <div @click="router.push('/cases')" class="flex items-center gap-2">
        <LucideShield class="w-7 h-7 text-indigo-400" />
        <span class="text-xl font-bold text-gray-100 tracking-wide">IVUKAT</span>
      </div>
      <!-- Orta: Sayfa başlığı veya arama -->
      <div class="hidden md:flex items-center">
        <div class="relative">
          <input
            type="text"
            placeholder="Dosya veya kullanıcı ara…"
            class="pl-10 pr-4 py-2 rounded-full bg-gray-800/80 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-72 shadow"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
            <LucideSearch class="w-5 h-5" />
          </span>
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
          <span class="text-gray-200 text-sm font-semibold">{{ auth?.session?.firstName }} {{ auth.session?.lastName }}</span>
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
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { LucideShield, LucideUser, LucideBell, LucideSearch } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()

</script>
