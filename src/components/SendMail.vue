<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 space-y-6">
      <input 
        type="text" 
        :placeholder="t('contact.form.name')"
        v-model="formData.name"
        class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
      >
      <input 
        type="email" 
        :placeholder="t('contact.form.email')"
        v-model="formData.email"
        class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
      >
      <textarea 
        rows="4" 
        :placeholder="t('contact.form.message')"
        v-model="formData.content"
        class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all resize-none"
      ></textarea>
      <button
        @click="submitForm"
        :disabled="isSubmitting"
        class="w-full p-3 md:p-4 rounded-lg bg-white text-black font-medium border border-white 
        transition-all duration-200 ease-in-out 
        hover:bg-white/80 focus:outline-none cursor-pointer
        disabled:opacity-100 disabled:cursor-not-allowed
        disabled:bg-white/80"
      >
        <div class="flex items-center justify-center gap-2">
          <Loading 
            v-if="isSubmitting" 
            size="sm"
          />
          <span>{{ isSubmitting ? t('contact.form.sending') : t('contact.form.submit') }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from './Loading.vue'
import { useToast } from '@/utils/toast'

interface FormData {
  name: string
  email: string
  content: string
}

interface ValidationResult {
  isValid: boolean
  message: string
}

const { t } = useI18n()
const { showToast } = useToast()

const isSubmitting = ref(false)
const formData = ref<FormData>({
  name: '',
  email: '',
  content: ''
})

// 验证函数
const validateName = (): ValidationResult => {
  if (!formData.value.name.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.noname')
    }
  }
  return { isValid: true, message: '' }
}

const validateEmail = (): ValidationResult => {
  if (!formData.value.email.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.noemail')
    }
  }
  return { isValid: true, message: '' }
}

const validateEmailFormat = (): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email.trim())) {
    return {
      isValid: false,
      message: t('message.form.validation.emailInvalid')
    }
  }
  return { isValid: true, message: '' }
}

const validateContent = (): ValidationResult => {
  if (!formData.value.content.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.nomessage')
    }
  }
  return { isValid: true, message: '' }
}

const validateContentLength = (): ValidationResult => {
  if (formData.value.content.trim().length < 10) {
    return {
      isValid: false,
      message: t('message.form.validation.messageLength')
    }
  }
  return { isValid: true, message: '' }
}

// 表单验证
const validateForm = (): ValidationResult => {
  const validations: Array<() => ValidationResult> = [
    validateName,
    validateEmail,
    validateEmailFormat,
    validateContent,
    validateContentLength
  ]
  
  for (const validate of validations) {
    const result = validate()
    if (!result.isValid) return result
  }
  
  return { isValid: true, message: '' }
}

// 发送表单数据
const sendFormData = async (data: FormData) => {
  const formDataToSend = new FormData()
  formDataToSend.append('name', data.name.trim())
  formDataToSend.append('email', data.email.trim())
  formDataToSend.append('content', data.content.trim())

  const response = await fetch('/api/index.php?mod=sendemail', {
    method: 'POST',
    body: formDataToSend
  })
  
  const text = await response.text()
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    throw new Error('Invalid server response')
  }
}

// 处理响应
const handleFormResponse = (data: any) => {
  if (data.code === 200 || data.code === '200') {
    showToast({ 
      message: t('message.form.success'),
      type: 'success' 
    })
    // 清空表单
    formData.value = {
      name: '',
      email: '',
      content: ''
    }
  } else {
    throw new Error(data.msg || 'Server error')
  }
}

// 处理错误
const handleFormError = (error: unknown) => {
  console.error('Form submission error:', error)
  showToast({ 
    message: error instanceof Error ? error.message : t('message.form.failed'),
    type: 'error' 
  })
}

// 提交表单
const submitForm = async () => {
  if (isSubmitting.value) return
  
  const validation = validateForm()
  if (!validation.isValid) {
    showToast({ message: validation.message, type: 'error' })
    return
  }
  
  isSubmitting.value = true
  
  try {
    const response = await sendFormData(formData.value)
    handleFormResponse(response)
  } catch (error) {
    handleFormError(error)
  } finally {
    isSubmitting.value = false
  }
}
</script> 