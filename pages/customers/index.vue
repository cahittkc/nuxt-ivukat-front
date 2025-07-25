<template>
    <div class=" py-10 px-4 max-w-7xl minh">
        <div class="flex w-full justify-end items-center mb-4">
            <button @click="openModal" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-auto">Yeni Müvekkil</button>
        </div> 
    
        <div>
            <div class="flex items-center gap-x-5 p-3 rounded-2xl shadow-xl bg-gray-900 mb-4">
                <div class="flex flex-col gap-y-1">
                    <span class="text-gray-300 text-sm">Müvekkil Tipi</span>
                    <select v-model="customerListObj.customerType" @change="getCustomers()" class="input-item min-w-[231px]">
                        <option value="person">Kişi</option>
                        <option value="company">Şirket</option>
                    </select>
                </div>
            </div>


            <div v-if="selectedCustomerType === 'person'" class="overflow-x-auto rounded-2xl">
                <table class="min-w-full w-full divide-y divide-gray-800">
                    <thead class="bg-gray-900">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Tc Kimlik No</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">AD soyad</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Olusturma Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(customer, index) in customers"
                            :key="customer.id"
                            :class="(index % 2 === 0) ? 'bg-gray-800' : 'bg-gray-900'"
                        >
                            <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ customer.identityNumber }}</td>
                            <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ customer.firstName }} {{ customer.middleName }} {{ customer.lastName }}</td>
                            <td class="px-4 py-3 text-gray-100">
                                {{ moment(customer.createdAt).format('DD/MM/YYYY HH:mm:ss') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="selectedCustomerType === 'company'" class="overflow-x-auto rounded-2xl">
                <table class="min-w-full w-full divide-y divide-gray-800">
                    <thead class="bg-gray-900">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Vergi No</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Şirket/Kurum adı</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-gray-200 tracking-wider uppercase">Olusturma Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(customer, index) in customers"
                            :key="customer.id"
                            :class="(index % 2 === 0) ? 'bg-gray-800' : 'bg-gray-900'"
                        >
                            <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ customer.taxNumber }}</td>
                            <td class="px-4 py-3 text-gray-100 font-medium whitespace-nowrap">{{ customer.companyName }}</td>
                            <td class="px-4 py-3 text-gray-100">
                                {{ moment(customer.createdAt).format('DD/MM/YYYY HH:mm:ss') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    </div>    


    <generalModal v-model="addCustomerModal" title="Müvekkil Ekle">
        <template #content>
            <div class="flex flex-col gap-y-3">
                <div class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="name">Müvekkil Tipi</label>
                    <select v-model="newCustomerObj.customerType" class="input-item min-w-[231px]">
                            <option value="person">Kişi</option>
                            <option value="company">Şirket</option>
                    </select>
                </div>
                <div v-if="newCustomerObj.customerType === 'person'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="identityNumber">T.C. Kimlik No</label>
                    <input v-model="newCustomerObj.identityNumber" type="text" id="identityNumber" class="input-item" placeholder="T.C. Kimlik No">
                </div>
                <div v-if="newCustomerObj.customerType === 'person'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="name">Ad</label>
                    <input v-model="newCustomerObj.firstName" type="text" id="name" class="input-item" placeholder="Ad">
                </div>
                <div v-if="newCustomerObj.customerType === 'person'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="middleName">Orta Ad</label>
                    <input v-model="newCustomerObj.middleName" type="text" id="middleName" class="input-item" placeholder="Orta Ad">
                </div>
                <div v-if="newCustomerObj.customerType === 'person'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="lastName">Soyad</label>
                    <input v-model="newCustomerObj.lastName" type="text" id="lastName" class="input-item" placeholder="Soyad">
                </div>
                <div v-if="newCustomerObj.customerType === 'company'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="companyName">Şirket Adı</label>
                    <input v-model="newCustomerObj.companyName" type="text" id="companyName" class="input-item" placeholder="Şirket Adı">
                </div>
                <div v-if="newCustomerObj.customerType === 'company'" class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="taxNumber">Vergi No</label>
                    <input v-model="newCustomerObj.taxNumber" type="text" id="taxNumber" class="input-item" placeholder="Vergi No">
                </div>
            </div>
        </template>
        <template #actions>
            <button @click="closeModal" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer">Kapat</button>
            <button @click="addCustomer" class="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2 rounded-lg cursor-pointer">Ekle</button>
        </template>
    </generalModal> 
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import moment from 'moment';

definePageMeta({
    layout: 'auth'
})

interface customer {
    id: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
    companyName: string | null,
    customerType: string,
    identityNumber: string | null,
    taxNumber: string | null,
    caseNumbers: string[],
    createdAt: string,
    deletedAt: string | null,
    updatedAt: string | null
}

const authStore = useAuthStore()


const addCustomerModal = ref(false)
const customerListObj = ref({
    userId : authStore?.authInfo?.id,
    page : 1,
    pageSize : 15,
    customerType : 'person'
})
const customers = ref<customer[]>([])

const newCustomerObj = ref({
    userId : authStore?.authInfo?.id,
    customerType : 'person',
    firstName : null as string | null,
    middleName : null as string | null,
    lastName : null as string | null,
    companyName : null as string | null,
    identityNumber : null as string | null,
    taxNumber : null as string | null,
    
})

const selectedCustomerType = computed(() => {
    return customerListObj.value.customerType
})


watch(addCustomerModal, (val) => {
    if(!val){
        newCustomerObj.value = {
            userId : authStore?.authInfo?.id,
            customerType : 'person',
            firstName : null as string | null,
            middleName : null as string | null,
            lastName : null as string | null,
            companyName : null as string | null,
            identityNumber : null as string | null,
            taxNumber : null as string | null,
            
        }
    }
})



const openModal = () => {
    addCustomerModal.value = true
}

const closeModal = () => {
    addCustomerModal.value = false
}

const addCustomer = async () => {
    if(newCustomerObj.value.customerType === 'person'){
        newCustomerObj.value.taxNumber = null
        newCustomerObj.value.companyName = null
    }

    if(newCustomerObj.value.customerType === 'company'){
        newCustomerObj.value.identityNumber = null
        newCustomerObj.value.firstName = null
        newCustomerObj.value.middleName = null
        newCustomerObj.value.lastName = null
    }
    console.log(newCustomerObj.value);
    const response = await apiRequest('post', '/customers/add-customer', newCustomerObj.value)
    console.log(response.data);
    if(response.data.success){
        getCustomers()
        closeModal()
    }
}

const getCustomers = async () => {

    const response = await apiRequest('post', '/customers/get-customers', customerListObj.value)
    if(response.data.success){
        customers.value = response.data.data
    }
}

onMounted(async () => {
    getCustomers()
})

</script>