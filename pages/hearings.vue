<template>
    <div class="minh bg-gradient-to-b from-gray-900 to-black py-10 p-4">
      <div class="mx-auto">
        <h1 class="text-3xl font-extrabold text-white mb-10 tracking-tight flex items-center gap-2">
          <span class="inline-block bg-blue-700 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          </span>
          Duruşma Listesi
        </h1>
        <div class="overflow-x-auto rounded-2xl shadow-xl bg-gray-900">
          <table class="min-w-full w-full divide-y divide-gray-800">
            <thead class="bg-gray-900">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Dosya No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Mahkeme</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Duruşma Türü</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Sonuç</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Tarih</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Katılanlar</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(hearing, index) in hearings" :key="hearing.hearingId">
                <tr
                  class="hover:bg-gray-900 transition"
                  :class="(index % 2 === 0) ? 'bg-gray-800' : ''"
                >
                  <td class="px-4 py-3 text-blue-400 cursor-pointer">{{ hearing.esasNo }}</td>
                  <td class="px-4 py-3 text-gray-100">{{ hearing.courtNameDescription }}</td>
                  <td class="px-4 py-3 text-gray-300">{{ hearing.hearingDescription }}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs font-semibold" :class="{
                      'bg-green-200 text-green-900': hearing.hearingResultDescription === 'Günü Verildi',
                      'bg-yellow-200 text-yellow-900': hearing.hearingResultDescription === 'Devam Ediyor',
                      'bg-red-200 text-red-900': hearing.hearingResultDescription === 'Kabul Edildi',
                      'bg-gray-200 text-gray-900': hearing.hearingResultDescription === 'Duruşma Yapıldı',
                    }">
                      {{ hearing.hearingResultDescription }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-300">{{ new Date(hearing.hearingDate).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</td>
                  <td class="px-4 py-3 text-gray-300">
                    <button 
                      @click="() => {
                        if (expandedHearingId === hearing.hearingId) {
                          expandedHearingId = null;
                        } else {
                          expandedHearingId = hearing.hearingId;
                        }
                      }"
                      class="flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                      {{ expandedHearingId === hearing.hearingId ? 'Katılanları Gizle' : 'Katılanları Göster' }}
                      <span>
                        <i v-if="expandedHearingId !== hearing.hearingId" class="fas fa-chevron-down text-blue-400" />
                        <i v-else class="fas fa-chevron-up text-blue-400" />
                      </span>
                    </button>
                  </td>
                </tr>
                <tr v-if="expandedHearingId === hearing.hearingId" class="bg-gray-900">
                  <td colspan="6">
                    <div class="p-6 rounded-lg border border-gray-700">
                      <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-200">Katılanlar</h3>
                        <div class="flex items-center gap-2">
                          <span class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-700 text-gray-300">Toplam: {{ hearing.parties.length }}</span>
                        </div>
                      </div>
                      <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-400">
                          <thead>
                            <tr>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Ad</th>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Soyad</th>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Rol</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-400">
                            <tr v-for="party in hearing.parties" :key="party.name" class="">
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center">
                                  <span class="text-gray-300 font-semibold text-xs">{{ party.name }}</span>
                                </div>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-gray-300 font-semibold text-xs">{{ party.lastName }}</div>
                              </td>
                              <td class="px-4 py-3 whitespace-nowrap">
                                <span class="text-gray-300 font-semibold text-xs">{{ party.attribution }}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div v-if="hearings.length === 0" class="text-center text-gray-300 py-20 text-lg flex flex-col space-y-10 flex-1 items-center justify-center min-h-[40vh]">
          <NotebookPen :size="72" class="text-gray-400 opacity-50" />
          <span class="text-gray-400 opacity-50">Hiç duruşma bulunamadı.</span>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  interface Party {
    name: string;
    lastName: string;
    attribution: string;
  }

  interface Hearing {
    hearingId: number;
    esasNo: string;
    courtNameDescription: string;
    hearingDescription: string;
    hearingResultDescription: string;
    hearingDate: string;
    parties: Party[];
  }

  import { ref, onMounted } from 'vue';
  import { apiRequest } from '@/utils/axiosService';
  import { useAuthStore } from '@/stores/auth';

  definePageMeta({
    layout: 'auth'
  })

  const authStore = useAuthStore()
  const hearings = ref<Hearing[]>([])
  const expandedHearingId = ref<number | null>(null)

  const listObj = ref({
    userId: null as string | null
  })

  const getHearings = async () => {
    try {
      listObj.value.userId = authStore?.session?.id as string
      const response = await apiRequest('post', `/hearings/get-hearings`, listObj.value)
      if(response.data.success){
        hearings.value = response.data.data
      }
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
    getHearings()
  })
  </script>