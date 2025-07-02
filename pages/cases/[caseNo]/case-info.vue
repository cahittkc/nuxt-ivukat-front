<template>
  <div>
    <div class="mx-auto bg-gray-900 rounded-2xl shadow-xl p-8">
      <h1 class="text-3xl font-extrabold text-white mb-8 flex items-center gap-2">
        <span class="inline-block bg-blue-700 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v5H7a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
        </span>
        Dava Detayı
      </h1>
      <div v-if="loading" class="text-gray-300">Yükleniyor...</div>
      <div v-else-if="!caseDetail" class="text-red-400">
        Dava detayı bulunamadı.
        <div class="mt-8">
          <NuxtLink to="/cases" class="text-blue-400 hover:underline">← Tüm Davalara Dön</NuxtLink>
        </div>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Sol Blok: Temel Bilgiler -->
          <table class="min-w-full w-full divide-y divide-gray-800 bg-gray-900 rounded-xl overflow-hidden">
            <tbody>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200 w-1/3">Dosya No</th><td class="px-4 py-3 text-blue-400 font-mono">{{ caseDetail.dosyaNo?.split('_')[1] || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Durum</th>
                <td class="px-4 py-3">
                  <span :class="caseDetail.dosyaDurumu === 'Açık' ? 'bg-yellow-200 text-yellow-900' : 'bg-green-200 text-green-900'" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ caseDetail.dosyaDurumu || '-' }}
                  </span>
                </td>
              </tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Dava Açılış Türü</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.davaAcilisTuru || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Dava Türleri</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.davaTurleri || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Geliş Nedeni</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.gelisNedeni || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Duruşma Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.durusmaTarihi ? caseDetail.durusmaTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Keşif Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.kesifTarihi ? caseDetail.kesifTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Ön İnceleme Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.onIncelemeTarihi ? caseDetail.onIncelemeTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Başvuruya Bırakılma Sayısı</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.basvuruyaBirakilmaSayisi ?? '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Başvuruya Bırakılma Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.basvuruyaBirakilmaTarihi ? caseDetail.basvuruyaBirakilmaTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">İlgili Dosyalar</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.ilgiliDosyalar || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">İlgili Davalar</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.ilgiliDavalar || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Birleşen Dosyalar</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.birlesenDosyalar || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Alt Dosya İade Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.altDosyaIadeTarihi ? caseDetail.altDosyaIadeTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Yürütme Durdurma Yapıldı</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.ydYapildi ? 'Evet' : 'Hayır' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Yürütme Durdurmalı</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.yurutmeDurdurmali ? 'Evet' : 'Hayır' }}</td></tr>
            </tbody>
          </table>
          <!-- Sağ Blok: Karar, Özetler, Notlar, Finansal Bilgiler -->
          <table class="min-w-full w-full divide-y divide-gray-800 bg-gray-900 rounded-xl overflow-hidden">
            <tbody>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200 w-1/3">Karar</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.karar || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Karar No</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.kararNo || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Karar Tarihi</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.kararTarihi ? caseDetail.kararTarihi.split('T')[0] : '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Davanın Konusu</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.davaninKonusu || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Davanın Özeti</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.davaninOzeti || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Davanın Notları</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.davaninNotlari || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Savunmanın Özeti</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.savunmaninOzeti || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Takibin Türü</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.takibinTuruAciklama || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Takibin Şekli</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.takibinSekliAciklama || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Takibin Yolu</th><td class="px-4 py-3 text-gray-200">{{ caseDetail.takibinYoluAciklama || '-' }}</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Alacak Toplamı</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.alacakKalemToplamTutar ?? '-' }} ₺</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Faiz Tutarı</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.alacakKalemFaizTutar ?? '-' }} ₺</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Takip Sonrası Masraf</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.takipSonrasiMasraf ?? '-' }} ₺</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Vekalet Ücreti</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.vekaletUcreti ?? '-' }} ₺</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Tahsil Harcı</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.tahsilHarci ?? '-' }} ₺</td></tr>
              <tr><th class="px-4 py-3 text-left text-sm font-semibold text-gray-200">Yapılmış Borç Tahsilatı</th><td class="px-4 py-3 text-blue-300">{{ caseDetail.yapilmisBorcTahsilati ?? '-' }} ₺</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mt-8">
          <NuxtLink to="/cases" class="text-blue-400 hover:underline">← Tüm Davalara Dön</NuxtLink>
        </div>
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
    const response = await apiRequest('post', '/cases/get-case-info', { caseNo : caseNo })
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