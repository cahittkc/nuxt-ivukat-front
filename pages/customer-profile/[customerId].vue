<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div class="px-6 py-5 border-b border-gray-700">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-indigo-300">Müvekkil Profili</h2>
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-indigo-900 text-indigo-200">
                ID: {{ route?.params?.customerId }}
              </span>
            </div>
          </div>
  
          <!-- Profile Info -->
          <div v-if="customer" class="px-6 py-5">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="flex items-center space-x-4">
                <div class="h-20 w-20 rounded-full bg-indigo-900 flex items-center justify-center">
                  <span class="text-2xl font-bold text-indigo-300">
                    {{ customer.firstName ? customer.firstName.charAt(0).toUpperCase() : customer.companyName.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-white">{{ customer.firstName  }} {{ customer.middleName }} {{ customer.lastName }} {{ customer.companyName }}</h1>
                </div>
              </div>
              <div class="mt-4 md:mt-0">
                <button class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Profili Düzenle
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Tabs -->
        <div class="bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <nav class="bg-gray-900 px-6 border-b border-gray-700">
            <div class="flex space-x-8">
              <NuxtLink 
                :to="`/customer-profile/${route.params.customerId}`"
                class="px-1 py-4 text-sm font-medium hover:border-b-2 hover:border-indigo-500 hover:text-indigo-300 text-gray-400"
                :class="{'border-indigo-500 text-white border-b-2': $route.path === `/customer-profile/${route.params.customerId}`}"
                exact
              >
                Genel Bakış
              </NuxtLink>
              <NuxtLink 
                :to="`/customer-profile/${route.params.customerId}/cases`"
                class="px-1 py-4 text-sm font-medium hover:border-b-2 hover:border-indigo-500 hover:text-indigo-300 text-gray-400"
                :class="{'border-indigo-500 text-white border-b-2': $route.path.includes('cases')}"
              >
                Davalar
              </NuxtLink>
              <NuxtLink 
                :to="`/customer-profile/${route.params.customerId}/files`"
                class="px-1 py-4 text-sm font-medium hover:border-b-2 hover:border-indigo-500 hover:text-indigo-300 text-gray-400"
                :class="{'border-indigo-500 text-white border-b-2': $route.path.includes('files')}"
              >
                Dosyalar
              </NuxtLink>
            </div>
          </nav>
  
          <!-- Tab Content -->
          <div class="p-6">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  definePageMeta({
    layout: 'auth',
    key: (route) => route.fullPath
  });

  interface customer {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    companyName: string;
  }
  
  const route = useRoute();
  const customer = ref<customer>({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    companyName: '',
  })


  const getCustomer = async () => {
    try {
      const response = await apiRequest('get', `/customers/get-customer/${route.params.customerId}`);
      if (response.data.success) {
        customer.value = response.data.data;
      }
    } catch (error) {
      console.error('Müşteri bilgileri yüklenirken hata oluştu:', error);
    }
  };

onMounted(() => {
    getCustomer()
})  
</script>