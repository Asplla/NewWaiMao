<template>
  <div class="fixed inset-0 z-[999] flex items-center justify-center">
    <!-- 背景遮罩 -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- 对话框 -->
    <div class="relative bg-[#000000] border border-[#333333] rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-white mb-3">
          {{ t('languageSwitch.title', {}, { locale: suggestedLocale }) }}
        </h3>
        <p class="text-[#888888] text-base mb-8">
          {{ t(`languageSwitch.${suggestedLocale === 'en' ? 'toEn' : suggestedLocale === 'zh' ? 'toZh' : 'toEs'}.message`, 
              { country: COUNTRY_NAMES[(countryCode as CountryCode) || 'default']?.[suggestedLocale] }, 
              { locale: suggestedLocale }) }}
        </p>
        <div class="flex justify-center gap-3">
          <button
            @click="$emit('switch')"
            class="px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {{ t(`languageSwitch.${suggestedLocale === 'en' ? 'toEn' : suggestedLocale === 'zh' ? 'toZh' : 'toEs'}.switch`, {}, { locale: suggestedLocale }) }}
          </button>
          <button
            @click="$emit('close')"
            class="px-6 py-2.5 border border-[#333333] text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {{ t(`languageSwitch.${suggestedLocale === 'en' ? 'toEn' : suggestedLocale === 'zh' ? 'toZh' : 'toEs'}.keep`, {}, { locale: suggestedLocale }) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()

type CountryCode = 'US' | 'GB' | 'AU' | 'CA' | 'JP' | 'ES' | 'MX' | 'AR' | 'CO' | 'PE' | 'CL' | 'default'

const COUNTRY_NAMES: Record<CountryCode, { en: string; zh: string; es: string }> = {
  US: {
    en: 'the United States',
    zh: '美国',
    es: 'los Estados Unidos'
  },
  GB: {
    en: 'the United Kingdom',
    zh: '英国',
    es: 'el Reino Unido'
  },
  AU: {
    en: 'Australia',
    zh: '澳大利亚',
    es: 'Australia'
  },
  CA: {
    en: 'Canada',
    zh: '加拿大',
    es: 'Canadá'
  },
  JP: {
    en: 'Japan',
    zh: '日本',
    es: 'Japón'
  },
  ES: {
    en: 'Spain',
    zh: '西班牙',
    es: 'España'
  },
  MX: {
    en: 'Mexico',
    zh: '墨西哥',
    es: 'México'
  },
  AR: {
    en: 'Argentina',
    zh: '阿根廷',
    es: 'Argentina'
  },
  CO: {
    en: 'Colombia',
    zh: '哥伦比亚',
    es: 'Colombia'
  },
  PE: {
    en: 'Peru',
    zh: '秘鲁',
    es: 'Perú'
  },
  CL: {
    en: 'Chile',
    zh: '智利',
    es: 'Chile'
  },
  default: {
    en: 'an English-speaking region',
    zh: '英语地区',
    es: 'una región de habla inglesa'
  }
}

const props = defineProps<{
  suggestedLocale: 'en' | 'zh' | 'es'
  countryCode: string
}>()

defineEmits<{
  (e: 'update:suggestedLocale', value: 'en' | 'zh' | 'es'): void
  (e: 'switch'): void
  (e: 'close'): void
}>()

onMounted(() => {
  console.log('Language switch dialog mounted with i18n', {
    suggestedLocale: props.suggestedLocale
  })
})
</script>

<style scoped>
@keyframes dialogIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fixed {
  animation: dialogIn 0.2s ease-out;
}
</style> 