<!-- components/GeneralModal.vue -->
<template>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modelValue"
          class="fixed top-0 left-0 w-full h-full z-50 flex bg-black/70"
          @click="handleBackdropClick"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >
          <div
            @click.stop
            :class="[`${width}`, { 'max-h-[90vh]': !fullHeight }]"
            class="bg-gray-800 text-gray-200 z-50 max-[450px]:!w-[98%] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-y-auto shadow-xl border border-gray-700"
          >
            <div class="p-4 border-b border-gray-700 flex justify-between items-center">
              <span></span>
              <span :id="titleId" class="text-lg text-white max-lg:text-base font-semibold">{{ title }}</span>
              <button
                @click="close"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Close modal"
              >
                <LucideCircleX :size="18" class="cursor-pointer" />
              </button>
            </div>
            <div class="p-4 max-sm:p-3 overflow-y-auto text-gray-300">
              <slot name="content"></slot>
            </div>
            <div
              v-if="$slots.actions"
              class="mt-auto py-4 px-4 flex items-center justify-center gap-x-4 border-t border-gray-700 w-full"
            >
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
  import { computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useBodyScrollLock } from '~/composables/useBodyScrollLock'
  import { LucideCircleX } from 'lucide-vue-next'
  
  const props = defineProps({
    title: { type: String, default: 'Modal Title' },
    modelValue: { type: Boolean, default: false },
    width: { type: String, default: 'w-[500px]' },
    fullHeight: { type: Boolean, default: false },
    closeOnBackdrop: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
  })
  
  const emit = defineEmits(['update:modelValue', 'close'])
  
  const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)
  
  const close = () => {
    emit('update:modelValue', false)
    emit('close')
  }
  
  const handleBackdropClick = (e) => {
    if (props.closeOnBackdrop && e.target === e.currentTarget) {
      close()
    }
  }
  
  const handleKeydown = (e) => {
    if (props.closeOnEsc && e.key === 'Escape') {
      close()
    }
  }
  
  // Scroll kilidi composable
  useBodyScrollLock(() => props.modelValue)
  
  watch(() => props.modelValue, (val) => {
    if (val) {
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  </style>
  