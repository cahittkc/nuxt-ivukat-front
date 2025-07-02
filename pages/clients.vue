<template>
    <div class="minh ">
        <div class="bg-gray-900  rounded-2xl p-6 text-white shadow-xl">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Users class="h-6 w-6 text-indigo-400" />
                    Müvekkiller
                </h2>
                <div class="overflow-x-auto rounded-2xl">
                    <table class="min-w-full w-full divide-y divide-gray-800">
                        <thead class="bg-gray-900">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Name</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Case No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(client, index) in clients"
                                :key="client.id"
                                :class="(index % 2 === 1) ? 'bg-gray-800' : ''"
                            >
                                <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ client.fullName || '-' }}</td>
                                <td class="px-4 py-3 text-blue-400 underline">
                                    <NuxtLink :to="`/cases/${encodeURIComponent(client.caseNo as string)}/case-info`">
                                        {{ client.caseNo.split('_')[1] || '-' }}
                                    </NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <vue-awesome-paginate
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
            <div class="mt-8">
                <NuxtLink to="/cases" class="text-blue-400 hover:underline">← Tüm Davalara Dön</NuxtLink>
            </div>
        </div>
    </div>
</template>





<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { Users } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore();
const clients = ref<any[]>([])


const pagination = ref({
    page : 1,
    total : 0
})

const listObj = ref({
    userId : null as string |  null,
    page : 1,
    pageSize : 14,
})


const onClickHandler = async (page :number) => {
    listObj.value.page = page
    getClients();
    
}


const getClients = async () => {
    try {
        listObj.value.userId = authStore?.session?.id as string
        const response = await apiRequest('post', `/clients/get-clients`, listObj.value)
        if(response.data.success){
            clients.value = response.data.data.data
            pagination.value.page = response.data.data.page
            pagination.value.total = response.data.data.total
        }
    } catch (error) {
        console.log(error);
        
    }
}



onMounted(async () => {
    getClients();
})

</script>