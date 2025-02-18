import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

export function useLoading() {
  const showLoading = (msg?: string) => {
    message.value = msg || ''
    visible.value = true
  }

  const hideLoading = () => {
    visible.value = false
    message.value = ''
  }

  return {
    visible,
    message,
    showLoading,
    hideLoading
  }
} 