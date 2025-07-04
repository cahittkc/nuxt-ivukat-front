<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import "vue-awesome-paginate/dist/style.css";
import { useAuthStore } from '@/stores/auth'

interface ChromeTabsQueryInfo {
  active: boolean;
  currentWindow: boolean;
}

interface ChromeTab {
  id: number;
  url: string;
  title: string;
}

interface ChromeTabs {
  query(info: ChromeTabsQueryInfo, callback: (tabs: ChromeTab[]) => void): void;
}

interface ChromeRuntime {
  sendMessage(extensionId: string, message: any, callback: (response: any) => void): void;
}

interface Chrome {
  tabs: ChromeTabs;
  runtime: ChromeRuntime;
}

declare global {
  interface Window {
    chrome?: Chrome;
  }
}

const auth = useAuthStore()

// Tarayıcı sekmelerini kontrol etmek için
const getActiveTab = () => {
  if (window.chrome?.tabs) {
    window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs: ChromeTab[]) => {
      console.log('Aktif sekme URL:', tabs[0]?.url);
    });
  }
}

// Extension'a data göndermek için
const sendDataToExtension = (data: any, extensionId: string) => {
  if (window.chrome?.runtime) {
    window.chrome.runtime.sendMessage(extensionId, { data }, (response: any) => {
      console.log('Extension yaniti:', response);
    });
  }
}

onMounted(async () => {
  if(auth.session){
    await auth.getSession();
    await auth.setRefreshTokenTime(); 
    getActiveTab();
  }
  
  // Örnek kullanım
  
  // sendDataToExtension({ message: "Merhaba" }, "extension-id");
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
