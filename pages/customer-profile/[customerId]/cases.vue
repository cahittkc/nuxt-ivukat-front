<template>
    <div class="">
        <div class="flex w-full justify-end items-center mb-4">
            <button @click="addCasesModal = true" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-auto">Dava İlişkilendir</button>
        </div>

        <div class="overflow-x-auto rounded-2xl shadow-xl bg-gray-900 p-1">
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
                        v-for="(caseItem, index) in customerCases"
                        :key="caseItem.id"
                        class="hover:bg-gray-900 transition border-b border-gray-800"
                    >
                        <td class="px-4 py-3 text-gray-100">{{ caseItem.court }}</td>
                        <td class="px-4 py-3 text-blue-400 cursor-pointer">{{ caseItem.esasNo }}</td>
                        <td class="px-4 py-3 text-gray-300 whitespace-nowrap">{{ caseItem.description }}</td>
                        <td class="px-4 py-3">
                        <span :class="caseItem.caseStatusCode === 0 ? 'bg-yellow-200 text-yellow-900' : 'bg-green-200 text-green-900'" 
                                class="px-2 py-1 rounded text-xs font-semibold">
                            {{ caseItem.caseStatusCode === 0 ? 'Açık' : 'Kapalı' }}
                        </span>
                        </td>
                        <td class="px-4 py-3 text-gray-300">
                        <div class="flex items-center gap-x-0.5">
                            <NuxtLink v-for="o in caseItem.oldEsasNo" :key="o" :to="`/cases/${encodeURIComponent(o as string)}/case-info`">
                            <span class="text-blue-400">{{ o }}</span>
                            </NuxtLink>
                        </div>
                        </td>
                        <td class="px-4 py-3 text-gray-300">{{ moment(caseItem.date).format('DD.MM.YYYY') }}</td>
                        <td class="px-4 py-3">
                            <NuxtLink :to="`/cases/${encodeURIComponent(caseItem.caseNo)}/case-info`">
                                <Eye :size="22" class=" text-blue-400" />
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



       <general-modal v-model="addCasesModal" title="Dava İlişkilendir">
        <template #content>
            <div class="relative min-h-[300px]">
                <div class="flex relative items-center justify-center w-full gap-x-2">
                    <input
                        type="text"
                        placeholder="Dosya arama…"
                        class="py-2 rounded-full pl-10 bg-gray-800/80 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-full shadow"
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
                <div v-if="cases.length > 0" class="absolute top-[48px] z-10 w-full bg-gray-700 rounded-lg p-2 max-h-[185px]  overflow-y-auto">
                    <table class="min-w-full w-full divide-y divide-gray-800 ">
                        <tbody>
                            <tr
                                v-for="(caseItem, index) in cases"
                                :key="caseItem.id"
                                @click="addCase(caseItem.caseNo)"
                                class="hover:bg-gray-900 transition bg-gray-800 cursor-pointer"
                                :class="{'bg-green-600 hover:bg-green-600': selectedCaseForAdd.includes(caseItem.caseNo)}"
                            >
                                <td class="px-4 py-3 text-gray-100">{{ caseItem.court }}</td>
                                <td class="px-4 py-3 text-gray-100 cursor-pointer">{{ caseItem.esasNo }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <div v-if="selectedCaseForAdd.length > 0" :class="{'absolute top-[244px] z-10 w-full': search.length > 0 || cases.length > 0} " class="absolute top-[60px] z-10 w-full">
                    <div class="flex items-center gap-2 flex-wrap">
                        <div v-for="caseItem in selectedCaseForAdd" :key="caseItem.id" class="flex items-center gap-2 bg-gray-900 p-2 rounded-lg">
                            <div class="flex-1">
                                <div class="text-gray-200">{{ caseItem.split('_')[1]}}</div>
                            </div>
                            <button 
                                @click.stop="removeCase(caseItem)"
                                class="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-700 transition-colors"
                                title="Kaldır"
                            >
                                <LucideX :size="14" />
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        </template>
        <template #actions>
            <button @click="addCasesModal = false" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer">Kapat</button>
            <button @click="saveCases" class="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2 rounded-lg cursor-pointer">Ekle</button>
        </template>
       </general-modal>
    </div>
</template>



<script setup lang="ts">
import { Eye } from 'lucide-vue-next';
import moment from 'moment';


definePageMeta({
    layout: 'auth'
})



const route = useRoute();
const addCasesModal = ref(false)
const customerCases = ref<any[]>([])
const cases = ref<any[]>([])
const search = ref('')
const searchInput = ref(null)
const auth = useAuthStore()
const selectedCaseForAdd = ref<any[]>([])

let searchTimeout: NodeJS.Timeout | null = null

    const searchHandler = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Eğer arama değeri 4 karakterden azsa veya boşsa, timeout'u temizle ve döndür
  if (search.value.length < 3 || !search.value.trim()) {
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
      addCasesModal.value = true
    } catch (error) {
      console.log(error)
    }
  }, 300)
}

watch(() => addCasesModal.value, (value) => {
    if (!value) {
      search.value = ''
      cases.value = []
      selectedCaseForAdd.value = []
    }
})

const clearText = (e: Event) => {
    e.preventDefault()
    search.value = ''
    cases.value = []
}

const removeCase = (caseNo: string) => {
    if(selectedCaseForAdd.value.includes(caseNo)){
        selectedCaseForAdd.value.splice(selectedCaseForAdd.value.indexOf(caseNo), 1)
    }
}

const addCase = (caseNo: string) => {
    if(selectedCaseForAdd.value.includes(caseNo)){
        selectedCaseForAdd.value.splice(selectedCaseForAdd.value.indexOf(caseNo), 1)
    }else{
        selectedCaseForAdd.value.push(caseNo)
    }
}

const saveCases = async () => {
    try {
        let data = {
            caseNos: selectedCaseForAdd.value,
            customerId: route.params.customerId
        }
        const result = await apiRequest('post', '/customer-cases/add', data)
        if(result.data.success){
            addCasesModal.value = false
            selectedCaseForAdd.value = []
            getCustomerCases()
        }
    } catch (error) {
        console.log(error)
    }
}


const getCustomerCases = async () => {
    try {
        const response = await apiRequest('post', `/customer-cases/get-customer-cases`, { customerId: route.params.customerId });
        if (response.data.success) {
            customerCases.value = response.data.data;
        }
    } catch (error) {
        console.error('Müşteri bilgileri yüklenirken hata oluştu:', error);
    }
};


onMounted(() => {
    getCustomerCases()
})


</script>