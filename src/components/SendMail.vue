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
        class="w-full p-3 md:p-4 rounded-lg bg-white text-black border border-white 
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

const { t } = useI18n()
const { showToast } = useToast()

const isSubmitting = ref(false)
const formData = ref({
  name: '',
  email: '',
  content: ''
})

// 表单验证
const validateForm = (): { isValid: boolean; message: string } => {
  // 验证名字
  if (!formData.value.name.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.noname')
    }
  }

  // 验证邮箱
  if (!formData.value.email.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.noemail')
    }
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email.trim())) {
    return {
      isValid: false,
      message: t('message.form.validation.emailInvalid')
    }
  }

  // 验证内容
  if (!formData.value.content.trim()) {
    return {
      isValid: false,
      message: t('message.form.validation.nomessage')
    }
  }

  // 验证内容长度
  if (formData.value.content.trim().length < 10) {
    return {
      isValid: false,
      message: t('message.form.validation.messageLength')
    }
  }

  return {
    isValid: true,
    message: ''
  }
}

// 提交表单
const submitForm = async () => {
  if (isSubmitting.value) return
  
  // 表单验证
  const { isValid, message } = validateForm()
  if (!isValid) {
    showToast({
      message,
      type: 'error'
    })
    return
  }
  
  isSubmitting.value = true

  try {
    // 使用 FormData
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.value.name.trim())
    formDataToSend.append('email', formData.value.email.trim())
    formDataToSend.append('content', formData.value.content.trim())
    

    const response = await fetch('/api/index.php?mod=sendemail', {
      method: 'POST',
      body: formDataToSend
    })
    
    const text = await response.text()
    console.log('Raw response:', text)

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    let data
    try {
      data = JSON.parse(text)
      console.log('Parsed response:', data)
    } catch (e) {
      console.error('Failed to parse response:', e)
      throw new Error('Invalid server response')
    }

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
  } catch (error) {
    console.error('Form submission error:', error)
    showToast({ 
      message: error instanceof Error ? error.message : t('message.form.failed'),
      type: 'error' 
    })
  } finally {
    isSubmitting.value = false
  }
}
</script> 