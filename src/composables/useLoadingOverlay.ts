import { ref, provide, inject, type Ref } from 'vue'

// 定义 Symbol key 用于 provide/inject
const LoadingOverlayKey = Symbol('LoadingOverlay')

export interface LoadingOverlayContext {
  visible: Ref<boolean>
  message: Ref<string>
  show: (message?: string) => void
  hide: () => void
}

export function provideLoadingOverlay() {
  const visible = ref(false)
  const message = ref('')

  const show = (msg: string = 'Loading...') => {
    message.value = msg
    visible.value = true
  }

  const hide = () => {
    visible.value = false
    message.value = ''
  }

  const context: LoadingOverlayContext = {
    visible,
    message,
    show,
    hide
  }

  provide(LoadingOverlayKey, context)

  return context
}

export function useLoadingOverlay() {
  const context = inject<LoadingOverlayContext>(LoadingOverlayKey)
  
  if (!context) {
    throw new Error('useLoadingOverlay must be used within a component that has called provideLoadingOverlay')
  }

  return context
} 