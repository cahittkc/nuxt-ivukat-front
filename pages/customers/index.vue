<template>
    <div class="minh bg-gradient-to-b from-gray-900 to-black py-10 px-4 max-w-7xl">
        <div class="flex w-full justify-end items-center">
            <button @click="openModal" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg ml-auto">Yeni Müvekkil</button>
        </div> 
    </div>


    <generalModal v-model="addCustomerModal" title="Müvekkil Ekle">
        <template #content>
            <div class="flex flex-col gap-y-3">
                <div class="flex flex-col gap-y-1.5">
                    <label class="xs-txt" for="name">Müvekkil Tipi</label>
                    <select v-model="newCustomerObj.customerType" class="input-item">
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
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
    layout: 'auth'
})

const authStore = useAuthStore()


const addCustomerModal = ref(false)

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
        closeModal()
    }
}

</script>