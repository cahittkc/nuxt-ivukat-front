<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'



const auth = useAuthStore()

onMounted(async () => {
  if(auth.session){
    await auth.getSession();
    await auth.setRefreshTokenTime(); 
  }
})


</script>

<style>
</style>
