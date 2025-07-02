<template>
  <div v-if="visible && cases" class="fixed inset-0 bg-black/50 backdrop-blur-2xl flex items-center justify-center z-50 top-[67px]">
    <div class="bg-gray-900 rounded-lg w-full max-w-7xl h-[70vh] overflow-y-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-200">Arama Sonuçları</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-200">
          <LucideX class="w-6 h-6" />
        </button>
      </div>

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
            <td class="px-4 py-3 text-gray-300">{{ (caseItem.date || '').split('T')[0] }}</td>
            <td class="px-4 py-3">
              <button @click="goToCase(caseItem.caseNo)" class="flex items-center gap-2 cursor-pointer">
                <LucideEye :size="22" class="text-blue-400" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="cases && !cases.length" class="text-center py-8 text-gray-400">
        <p>Hiç sonuç bulunamadı</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LucideX, LucideEye } from 'lucide-vue-next'

interface CaseItem {
  id: number
  court: string
  esasNo: string
  description: string
  caseStatusCode: number
  oldEsasNo: string[]
  date: string
  caseNo: string
}

const props = defineProps<{
  visible: boolean
  cases: CaseItem[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', caseNo: string): void
}>()

const closeModal = () => {
  emit('close')
}

const goToCase = (caseNo: string) => {
  emit('select', caseNo)
  closeModal()
}

// Modal görünür olduğunda odaklanma yönetimi
watch(() => props.visible, (visible) => {
  if (visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

// Klavye yönetimi
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

watch(() => props.visible, (visible) => {
  if (visible) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
/* Modal geçiş efektleri */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>