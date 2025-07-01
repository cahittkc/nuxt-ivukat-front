<template>
  <div class="min-h-screen p-4">
    <div class="flex gap-4 border-b border-gray-700 mb-6">
      <NuxtLink
        :to="`/cases/${encodeURIComponent(caseNo as string)}/case-info`"
        class="py-2 px-4 text-white"
        :class="{'border-b-2 border-indigo-500 text-indigo-400': $route.path.endsWith('/case-info')}"
      >
        Case Info
      </NuxtLink>
      <NuxtLink
        :to="`/cases/${encodeURIComponent(caseNo as string)}/parties`"
        class="py-2 px-4 text-white"
        :class="{'border-b-2 border-indigo-500 text-indigo-400': $route.path.endsWith('/parties')}"
      >
        Parties
      </NuxtLink>
    </div>
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  })



import { useRoute } from 'vue-router';
const route = useRoute()
const caseNo = route.params.caseNo
</script> 