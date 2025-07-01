<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-black py-10 px-4">
    <div class="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-8">
      <h1 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span class="inline-block bg-blue-700 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
        </span>
        Dava Detayı
      </h1>
      <div v-if="loading" class="text-gray-300">Yükleniyor...</div>
      <div v-else-if="!caseDetail" class="text-red-400">Dava bulunamadı.</div>
      <div v-else class="space-y-4">
        <div class="flex justify-between text-gray-400">
          <span>Dosya No:</span>
          <span class="text-blue-400 font-mono">{{ caseDetail.dosyaNo }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Durum:</span>
          <span :class="caseDetail.dosyaDurumu === 'Açık' ? 'bg-yellow-200 text-yellow-900' : 'bg-green-200 text-green-900'" class="px-2 py-1 rounded text-xs font-semibold">
            {{ caseDetail.dosyaDurumu }}
          </span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Takibin Türü:</span>
          <span class="text-gray-200">{{ caseDetail.takibinTuruAciklama }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Takibin Şekli:</span>
          <span class="text-gray-200">{{ caseDetail.takibinSekliAciklama }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Takibin Yolu:</span>
          <span class="text-gray-200">{{ caseDetail.takibinYoluAciklama }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Alacak Toplamı:</span>
          <span class="text-blue-300">{{ caseDetail.alacakKalemToplamTutar }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Faiz Tutarı:</span>
          <span class="text-blue-300">{{ caseDetail.alacakKalemFaizTutar }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Takip Sonrası Masraf:</span>
          <span class="text-blue-300">{{ caseDetail.takipSonrasiMasraf }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Vekalet Ücreti:</span>
          <span class="text-blue-300">{{ caseDetail.vekaletUcreti }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Tahsil Harcı:</span>
          <span class="text-blue-300">{{ caseDetail.tahsilHarci }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Yapılmış Borç Tahsilatı:</span>
          <span class="text-blue-300">{{ caseDetail.yapilmisBorcTahsilati }} ₺</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Karar:</span>
          <span class="text-gray-200">{{ caseDetail.karar || '-' }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Karar No:</span>
          <span class="text-gray-200">{{ caseDetail.kararNo || '-' }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Karar Tarihi:</span>
          <span class="text-gray-200">{{ caseDetail.kararTarihi ? caseDetail.kararTarihi.split('T')[0] : '-' }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Davanın Konusu:</span>
          <span class="text-gray-200">{{ caseDetail.davaninKonusu || '-' }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Davanın Özeti:</span>
          <span class="text-gray-200">{{ caseDetail.davaninOzeti || '-' }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Savunmanın Özeti:</span>
          <span class="text-gray-200">{{ caseDetail.savunmaninOzeti || '-' }}</span>
        </div>
      </div>
      <div class="mt-8">
        <NuxtLink to="/cases" class="text-blue-400 hover:underline">← Tüm Davalara Dön</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/utils/axiosService'

definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const caseNo = decodeURIComponent(route.params.caseNo as string)
const caseDetail = ref<any>(null)
const loading = ref(true)

const getCaseDetail = async () => {
  loading.value = true
  try {
    const response = await apiRequest('post', '/cases/get-case-info', { caseNo })
    if(response.data.success){
      caseDetail.value = response.data.data
    }
  } catch (e) {
    caseDetail.value = null
  }
  loading.value = false
}

onMounted(() => {
  getCaseDetail()
})
</script> 