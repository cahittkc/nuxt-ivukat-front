<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-4">
      <div class="mx-auto">
        <h1 class="text-3xl font-extrabold text-white mb-10 tracking-tight flex items-center gap-2">
          <span class="inline-block bg-blue-700 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          </span>
          Dava Listesi
        </h1>
        <div v-if="cases.length === 0" class="text-center text-gray-300 py-20 text-lg">Hiç dava bulunamadı.</div>
        <div v-else class="overflow-x-auto rounded-2xl shadow-xl bg-gray-900">
          <table class="min-w-full w-full divide-y divide-gray-800">
            <thead class="bg-gray-900">
              <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Mahkeme</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Dava No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Açıklama</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Durum</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Tarih</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(caseItem, index) in cases"
                :key="caseItem.id"
                class="hover:bg-gray-800 transition"
                :class="(index % 2 === 0) ? 'bg-gray-800' : ''"
              >
              <td class="px-4 py-3 text-gray-100">{{ caseItem.court }}</td>
              <td class="px-4 py-3 text-blue-400  cursor-pointer">{{ caseItem.esasNo }}</td>
                <td class="px-4 py-3 text-gray-300 whitespace-nowrap">{{ caseItem.description }}</td>
                <td class="px-4 py-3">
                  <span :class="caseItem.caseStatusCode === 0 ? 'bg-yellow-200 text-yellow-900' : 'bg-green-200 text-green-900'" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ caseItem.caseStatusCode === 0 ? 'Açık' : 'Kapalı' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-gray-300">{{ (caseItem.date || '').split('T')[0] }}</td>
                <td class="px-4 py-3">
                  <button v-if="caseItem.judgmentTypeId != '0'" @click="goToCase(caseItem.caseNo)" class="flex items-center gap-2 cursor-pointer">
                    <Eye :size="24" class="w-4 h-4 text-blue-400" />
                  </button>
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Eye } from 'lucide-vue-next';
  definePageMeta({
    layout: 'auth'
  })
  
  import { ref, onMounted } from 'vue'
  import { apiRequest } from '@/utils/axiosService'
  import { useAuthStore } from '@/stores/auth'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  interface CaseItem {
    id: number
    userId: string
    esasNo: string
    oldEsasNo: string[]
    description: string
    court: string
    courtId: string
    date: string
    caseNo: string
    caseStatusCode: number
    caseTypeCode: number
    judgmentTypeId: string
    judgmentUnitUyapId: string
    caseClients: string[]
  }
  
  const cases = ref<CaseItem[]>([])
  
  const getCases = async () => {
    const response = await apiRequest('post', '/cases/get-cases-by-user-id', {
      userId: authStore.authInfo.id 
    })
    if(response.data.success){
      cases.value = response.data.data
    }
  }
  
  
  
  const goToCase = (caseNo: string) => {
  
    let nCaseNo = caseNo.replace('/', '-')
  
    router.push(`/cases/${encodeURIComponent(nCaseNo)}`)
  }
  
  onMounted(() => {
    getCases()
  })
  </script>