// composables/useBodyScrollLock.ts
import { watch, onBeforeUnmount } from 'vue'

export function useBodyScrollLock(isLocked : any) {
  const lock = () => {
    if (process.client) document.body.style.overflow = 'hidden'
  }

  const unlock = () => {
    if (process.client) document.body.style.overflow = 'auto'
  }

  watch(isLocked, (val) => {
    if (val) lock()
    else unlock()
  }, { immediate: true })

  onBeforeUnmount(() => {
    unlock()
  })
}
