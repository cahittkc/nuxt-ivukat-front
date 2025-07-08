<template>
  <div class="minh bg-gradient-to-b from-gray-900 to-black py-10 px-4">
    <div class="mx-auto max-w-7xl">
      <!-- Hoş geldin mesajı -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          Hoş geldiniz, {{ auth?.session?.firstName + ' ' + (auth?.session?.middleName ?? '')  + ' ' + auth?.session?.lastName }}
        </h1>
        <p class="text-gray-300 text-lg">Tüm dava ve müvekkil süreçlerinizi tek panelden yönetin.</p>
      </div>
    <!-- Özet Kartlar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div class="bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white bg-indigo-900 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          <div>
            <div class="text-2xl font-bold text-white">12</div>
            <div class="text-gray-200 text-sm font-semibold tracking-wide">Davalarım</div>
          </div>
        </div>
        <div class="bg-gradient-to-tr from-pink-700 via-pink-600 to-pink-800 rounded-2xl shadow-lg p-6 flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white bg-pink-900 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM9 20H4v-2a3 3 0 013-3h4a3 3 0 013 3v2H9z" /></svg>
          <div>
            <div class="text-2xl font-bold text-white">7</div>
            <div class="text-gray-200 text-sm font-semibold tracking-wide">Müvekillerim</div>
          </div>
        </div>
      </div>
      <!-- Yaratıcı Alan: Hızlı Erişim ve Analiz -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div class="bg-gray-800 rounded-2xl p-6 shadow flex flex-col gap-2">
          <div class="text-lg font-semibold text-indigo-300 mb-2">Hızlı Erişim</div>
          <ul class="space-y-2">
            <li><NuxtLink to="/cases" class="text-blue-400 hover:underline">→ Davalarım</NuxtLink></li>
            <li><NuxtLink to="/clients" class="text-pink-400 hover:underline">→ Müvekillerim</NuxtLink></li>
            <li><NuxtLink to="/hearings" class="text-green-400 hover:underline">→ Duruşmalarım</NuxtLink></li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-2xl p-6 shadow flex flex-col gap-2">
          <div class="text-lg font-semibold text-pink-300 mb-2">Analiz & İstatistik</div>
          <div class="flex flex-col gap-1 text-gray-300">
            <div>Aktif Dava: <span class="font-bold text-indigo-400">5</span></div>
            <div>Kapanan Dava: <span class="font-bold text-green-400">7</span></div>
            <div>Toplam Müvekkil: <span class="font-bold text-pink-400">7</span></div>
          </div>
        </div>
      </div>
      <!-- Alt Alanlar: Son Aktiviteler ve Hızlı Kısayollar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Son Aktiviteler -->
        <div class="bg-gray-900 rounded-2xl p-6 shadow flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2">
            <ActivitySquare class="w-6 h-6 text-indigo-400" />
            <span class="text-lg font-semibold text-indigo-200">Son Aktiviteler</span>
          </div>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center gap-2">
              <FileText class="w-5 h-5 text-blue-400" />
              <span>Yeni bir dava eklendi: <span class="font-semibold text-white">2024/7198</span></span>
              <span class="ml-auto text-xs text-gray-400">2 dk önce</span>
            </li>
            <li class="flex items-center gap-2">
              <UserPlus class="w-5 h-5 text-pink-400" />
              <span>Yeni müvekkil eklendi: <span class="font-semibold text-white">Seda Yılmaz</span></span>
              <span class="ml-auto text-xs text-gray-400">10 dk önce</span>
            </li>
            <li class="flex items-center gap-2">
              <Gavel class="w-5 h-5 text-green-400" />
              <span>Dava kapandı: <span class="font-semibold text-white">2023/1234</span></span>
              <span class="ml-auto text-xs text-gray-400">1 saat önce</span>
            </li>
            <li class="flex items-center gap-2">
              <UserCheck class="w-5 h-5 text-indigo-400" />
              <span>Müvekkil bilgisi güncellendi: <span class="font-semibold text-white">Ahmet Demir</span></span>
              <span class="ml-auto text-xs text-gray-400">2 saat önce</span>
            </li>
          </ul>
        </div>
        <!-- Hızlı Kısayollar -->
        <div class="bg-gray-900 rounded-2xl p-6 shadow flex flex-col gap-4">
          <div class="flex items-center gap-2 mb-2">
            <Rocket class="w-6 h-6 text-pink-400" />
            <span class="text-lg font-semibold text-pink-200">Hızlı Kısayollar</span>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <NuxtLink to="/cases" class="flex flex-col items-center justify-center bg-indigo-700 hover:bg-indigo-800 transition rounded-xl p-4 shadow text-white">
              <Gavel class="w-7 h-7 mb-1" />
              <span class="font-semibold">Davalarım</span>
            </NuxtLink>
            <NuxtLink to="/clients" class="flex flex-col items-center justify-center bg-pink-700 hover:bg-pink-800 transition rounded-xl p-4 shadow text-white">
              <Users class="w-7 h-7 mb-1" />
              <span class="font-semibold">Müvekillerim</span>
            </NuxtLink>
            <NuxtLink to="/calendar" class="flex flex-col items-center justify-center bg-green-700 hover:bg-green-800 transition rounded-xl p-4 shadow text-white">
              <Calendar class="w-7 h-7 mb-1" />
              <span class="font-semibold">Takvim</span>
            </NuxtLink>
            <NuxtLink to="/notes" class="flex flex-col items-center justify-center bg-yellow-700 hover:bg-yellow-800 transition rounded-xl p-4 shadow text-white">
              <FileText class="w-7 h-7 mb-1" />
              <span class="font-semibold">Notlarım</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Hearings Timeline (moved above) -->
    <div v-if="hearings.length > 0" class="max-w-7xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg">
      <h2 class="text-2xl text-gray-300 font-bold mb-8">Yaklaşan Duruşmalar</h2>
      <div class="relative">
        <!-- vertical line -->
        <span class="absolute left-3 top-0 w-px h-full bg-gray-600"></span>
        <div
          v-for="(hearing, idx) in sortedHearings"
          :key="hearing.hearingId"
          class="relative pl-10 pb-8"
        >
          <!-- dot -->
          <span class="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-gray-800 flex items-center justify-center">
            <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
          </span>

          <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span>{{ formatDate(hearing.hearingDate) }}</span>
                <span>{{ formatTime(hearing.hearingDate) }}</span>
              </div>
              <h3 class="text-lg font-semibold text-white mt-1">
                {{ hearing.courtNameDescription }}
              </h3>
              <p class="text-gray-400 mt-1">
                {{ hearing.hearingDescription }}
              </p>
            </div>
            <span :class="getStatusClass(hearing.hearingResultDescription)" class="shrink-0">
              {{ hearing.hearingResultDescription }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-8 text-center">
      <p class="text-gray-400">Bu hafta yaklaşan duruşma bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActivitySquare, FileText, UserPlus, Gavel, UserCheck, Rocket, Users, Calendar } from 'lucide-vue-next'
import { useAuthStore } from '#imports';
import { apiRequest } from '@/utils/axiosService'
import moment from 'moment'

const sortedHearings = computed(() => {
  return [...hearings.value].sort((a, b) => moment(a.hearingDate).diff(moment(b.hearingDate)))
})

const formatDate = (date: string) => {
  return moment(date).format('DD.MM.YYYY')
}

const formatTime = (date: string) => {
  return moment(date).format('HH:mm')
}

const getStatusClass = (status: string) => {
  const baseClass = 'px-2 py-1 rounded-full text-sm font-medium'
  
  switch (status) {
    case 'Kabul Edildi':
      return `${baseClass} bg-green-500 text-white`
    case 'Reddedildi':
      return `${baseClass} bg-red-500 text-white`
    case 'Günü Verildi':
      return `${baseClass} bg-blue-500 text-white`
    case 'Devam Ediyor':
      return `${baseClass} bg-yellow-500 text-gray-800`
    default:
      return `${baseClass} bg-gray-500 text-white`
  }
}

const auth = useAuthStore();

definePageMeta({
  layout : 'auth'
})


const hearingListObj = ref({
    userId : null as string | null,
    startDate: '',
    endDate: ''
})

interface Hearing {
  hearingId: string;
  hearingDate: string;
  courtNameDescription: string;
  hearingDescription: string;
  hearingResultDescription: string;
}

const hearings = ref<Hearing[]>([])

const getHearings = async () => {
    try {
        hearingListObj.value.userId = auth.session?.id as string
        const response = await apiRequest('post', '/hearings/get-hearings', hearingListObj.value)
        hearings.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    const today = moment()
    hearingListObj.value.startDate = today.startOf('day').format('YYYY-MM-DD HH:mm:ssZ');
    hearingListObj.value.endDate = today.clone().add(7, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ssZ');
    getHearings()
})
</script>



