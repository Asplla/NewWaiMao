import { ref, provide, inject, type Ref, readonly } from 'vue'

// 定义 Symbol key 用于 provide/inject
const LoadingOverlayKey = Symbol('LoadingOverlay')

export interface LoadingOverlayContext {
  visible: Ref<boolean>
  message: Ref<string>
  show: (message?: string) => void
  hide: () => void
}

export const provideLoadingOverlay = () => {
  const visible = ref(false)
  const message = ref('')
  
  const show = (msg = '') => {
    message.value = msg
    visible.value = true
  }
  
  const hide = () => {
    visible.value = false
    message.value = ''
  }
  
  provide(LoadingOverlayKey, {
    visible: readonly(visible),
    message: readonly(message),
    show,
    hide
  })
  
  return { show, hide }
}

export function useLoadingOverlay() {
  const context = inject<LoadingOverlayContext>(LoadingOverlayKey)
  
  if (!context) {
    throw new Error('useLoadingOverlay must be used within a component that has called provideLoadingOverlay')
  }

  return context
} 