<template>
  <div class="bg-gradient-to-b from-gray-900 to-black">
   
    <authHeader/>
    <main class="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div class="container mx-auto max-w-7xl">
        <slot />
      </div>
    </main>
  </div>
</template> 



<script setup lang="ts">
import authHeader from '~/components/authHeader.vue';

</script>