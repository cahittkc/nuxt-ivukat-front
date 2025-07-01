<template>
  <div class="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Users class="h-6 w-6 text-indigo-400" />
      Taraflar
    </h2>
    <div class="overflow-x-auto rounded-2xl">
      <table class="min-w-full w-full divide-y divide-gray-800">
        <thead class="bg-gray-900">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Rol</th>
            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Tip</th>
            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Adı Soyadı</th>
            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Vekil</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(party, index) in parties"
            :key="party.id"
            :class="(index % 2 === 1) ? 'bg-gray-800' : ''"
          >
            <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ party.rol || '-' }}</td>
            <td class="px-4 py-3 text-gray-100">{{ party.type || '-' }}</td>
            <td class="px-4 py-3 text-gray-100 ">{{ party.fullName || '-' }}</td>
            <td class="px-4 py-3 text-gray-100">{{ party.deputy || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8">
        <NuxtLink to="/cases" class="text-blue-400 hover:underline">← Tüm Davalara Dön</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
///get-case-parties/:caseNo

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { apiRequest } from '@/utils/axiosService'
import { Users } from 'lucide-vue-next'

const route = useRoute()

const parties = ref<any[]>([])

const getParties = async () => {
    try {
        const caseNo = decodeURIComponent(route.params.caseNo as string)
        const response = await apiRequest('get', `parties/get-case-parties/${caseNo.replace('/', '-')}`)
        if(response.data.success){
            parties.value = response.data.data
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
        
    }
}

onMounted(async () => {
    await getParties();
})

</script>