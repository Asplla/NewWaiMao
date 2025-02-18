import { ref } from 'vue'

interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

const visible = ref(false)
const message = ref('')
const type = ref<'success' | 'error' | 'info'>('info')
let timer: number | null = null

export function useToast() {
  const showToast = ({ message: msg, type: t = 'info', duration = 3000 }: ToastOptions) => {
    if (timer) {
      clearTimeout(timer)
    }
    
    message.value = msg
    type.value = t
    visible.value = true
    
    timer = window.setTimeout(() => {
      visible.value = false
    }, duration)
  }

  return {
    visible,
    message,
    type,
    showToast
  }
} 