<template>
    <div class="minh bg-gradient-to-b from-gray-900 to-black py-10 px-4">
      <div class="mx-auto">
        <h1 class="text-3xl font-extrabold text-white mb-10 tracking-tight flex items-center gap-2">
          <span class="inline-block bg-blue-700 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
          </span>
          Dava Listesi
        </h1>
        <div class="flex items-center gap-x-5 p-3 rounded-2xl shadow-xl bg-gray-900 mb-4">
          <div class="flex flex-col gap-y-1">
            <span class="text-gray-300 text-sm">Yargı Türü</span>
            <select v-model="selectedJudgmentType" @change="getJudgmentUnitsByTypeId()" class="input-item">
              <option v-for="c in judgmentTypes" :key="c.id" :value="c.uyapId">{{ c.name }}</option>
            </select>
          </div>

          <div class="flex flex-col gap-y-1">
            <span class="text-gray-300 text-sm">Yargı Birimi</span>
            <select v-model="selectedJudgmentUnit" @change="getCases()" class="input-item min-w-[231px]">
              <option :value="''">Seçiniz</option>
              <option v-for="c in judgmentUnits" :key="c.id" :value="c.uyapId">{{ c.name }}</option>
            </select>
          </div>


          <div>
            <button @click="getCases()" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 mt-5 rounded-2xl">Filtrele</button>
          </div>
          
        </div> 
        <div v-if="cases.length > 0" class="overflow-x-auto rounded-2xl shadow-xl bg-gray-900">
          <table class="min-w-full w-full divide-y divide-gray-800">
            <thead class="bg-gray-900">
              <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Mahkeme</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Dosya No</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Açıklama</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Durum</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">İlgili Davalar</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-200">Tarih</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(caseItem, index) in cases"
                :key="caseItem.id"
                class="hover:bg-gray-900 transition"
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
                <td class="px-4 py-3 text-gray-300">
                  <div class="flex items-center gap-x-0.5">
                      <NuxtLink v-for="o in caseItem.oldEsasNo" :key="o" :to="`/cases/${encodeURIComponent(o as string)}/case-info`">
                        <span class="text-blue-400" >{{ o }}</span>
                      </NuxtLink>
                  </div>
                </td>
                <td class="px-4 py-3 text-gray-300">{{ (caseItem.date || '').split('T')[0] }}</td>
                <td class="px-4 py-3">
                  <NuxtLink :to="`/cases/${encodeURIComponent(caseItem.caseNo)}/case-info`">
                    <Eye :size="22" class=" text-blue-400" />
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="cases.length === 0" class="text-center text-gray-300 py-20 text-lg flex flex-col space-y-10 flex-1 items-center justify-center min-h-[40vh]">
          <NotebookPen :size="72" class=" text-gray-400 opacity-50" />
          <span class="text-gray-400 opacity-50">Hiç dava bulunamadı.</span>
        </div>

        <vue-awesome-paginate
            v-if="cases.length > 0"
            :total-items="pagination.total"
            :items-per-page="listObj.pageSize"
            v-model="listObj.page"
            @click="onClickHandler"
            :max-pages-shown="3"
            prevButtonContent="Prev"
            nextButtonContent="Next"
            :show-breakpoint-buttons="true"
            :show-ending-buttons="true"
            :hidePrevNextWhenEnds="true"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Eye } from 'lucide-vue-next';
  import { useRouter } from 'vue-router';
  import { apiRequest } from '../../utils/axiosService'
   import { useAuthStore } from '../../stores/auth'
   import { NotebookPen } from 'lucide-vue-next';


  definePageMeta({
    layout: 'auth'
  })
  
  import { ref, onMounted } from 'vue'

 
  
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

  const listObj = ref({
    userId : authStore.authInfo.id,
    judgmentTypeId : '',
    judmentUnitUyapId : '',
    page : 1,
    pageSize : 15,
  })  
  
  const cases = ref<CaseItem[]>([])
  const judgmentTypes = ref<any[]>([])
  const selectedJudgmentType = ref('0')
  const selectedJudgmentUnit = ref('')
  const judgmentUnits = ref<any[]>([])

  const getJudgmentTypes = async () => {
    const response = await apiRequest('get', '/judgment-types/get-all')
    if(response.data.success){
      judgmentTypes.value = response.data.data
    }
  }


  const getJudgmentUnitsByTypeId = async () => {
    selectedJudgmentUnit.value = ''
    const response = await apiRequest('get', `/judgment-unit/get-units-by-type-id/${selectedJudgmentType.value}`)
    if(response.data.success){
      judgmentUnits.value = response.data.data
    }
  }
  
  const getCases = async () => {
    listObj.value.judgmentTypeId = selectedJudgmentType.value
    listObj.value.judmentUnitUyapId = selectedJudgmentUnit.value
    const response = await apiRequest('post', '/cases/get-cases-by-user-id', listObj.value)
    if(response.data.success){
      cases.value = response.data.data.data
      pagination.value.page = response.data.data.page
      pagination.value.total = response.data.data.total
    }
  }
  
  const pagination = ref({
    page : 1,
    total : 0
  })

  const onClickHandler = async (page :number) => {
      listObj.value.page = page
      getCases();
      
  }
  
  
  
  const goToCase = (caseNo: string) => {
    router.push(`/cases/${encodeURIComponent(caseNo)}/case-info`)
  }
  
  onMounted(async () => {
    await getJudgmentTypes()
    await getJudgmentUnitsByTypeId()
    await getCases()
  })
  </script>