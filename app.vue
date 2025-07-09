<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import "vue-awesome-paginate/dist/style.css";
import { useAuthStore } from '@/stores/auth'
import {watch} from 'vue'
import { onMounted, onUnmounted, ref } from 'vue';


const auth = useAuthStore()

const sendDataExtensionTimer = ref<NodeJS.Timeout | null>(null)


const sendDataToExtension = () => {
  window.postMessage({
    source : 'ivukat',
    type: 'FROM_IVUKAT_SEND_DATA',
    payload : {
      userId : auth.session?.id,
    }
  }, '*')
}

onMounted(async () => {
  if(auth.session){
    await auth.getSession();
    await auth.setRefreshTokenTime(); 
  }
})

watch(() => auth.session, () => {
  if(auth.session){
    sendDataExtensionTimer.value = setInterval(() => {
      sendDataToExtension();
    }, 5000);
  }
  else{
    clearInterval(sendDataExtensionTimer.value!);
  }
})

const normalizeTR = (str: string): string => {
  
    const normalizedStr = str
        .toLocaleLowerCase('tr-TR')
        .normalize('NFKD')
        .replace(/\s/g, '')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ı/g, 'i')
        .replace(/ş/g, 's')
        .replace(/ğ/g, 'g')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ü/g, 'u')
        .replace(/Ü/g, 'u');

        console.log(normalizedStr);
        
        return normalizedStr;
}

normalizeTR('İzmir 22. Asliye Ceza Mahkemesi 2026/106')

onUnmounted(() => {
  if(sendDataExtensionTimer.value){
    clearInterval(sendDataExtensionTimer.value);
  }
})

</script>

<style>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 2rem;
  user-select: none;
}
.paginate-buttons {
  background: #23272f;
  color: #d1d5db;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  margin: 0 2px;
  transition: all 0.2s;
  min-width: 36px;
  min-height: 36px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}
.paginate-buttons:hover,
.paginate-buttons:focus {
  background: #4f46e5;
  color: #fff;
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 2px #6366f1;
}
.number-buttons.active-page {
  background: #4f46e5;
  color: #fff;
  border-color: #6366f1;
  font-weight: 700;
  box-shadow: 0 2px 8px 0 #6366f1cc;
}
.back-button,
.next-button {
  background: #374151;
  color: #d1d5db;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.2rem;
  transition: all 0.2s;
}
.back-button:hover,
.next-button:hover {
  background: #4f46e5;
  color: #fff;
  border-color: #6366f1;
}

.vuecal__cell--today .vuecal__cell-date {
    background: rgb(203, 8, 8) !important;
}

@media (max-width: 640px) {
  .pagination-container {
    gap: 0;
  }
  .paginate-buttons {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
    min-width: 28px;
    min-height: 28px;
  }
}
</style>
