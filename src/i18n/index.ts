import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'
import es from './locales/es'

export const SUPPORT_LOCALES = ['en', 'zh', 'es'] as const
export type Locale = typeof SUPPORT_LOCALES[number]

const i18nInstance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    es
  }
})

export const i18n = i18nInstance

// 语言切换时保存到 localStorage
export function setLocale(locale: Locale) {
  i18nInstance.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.querySelector('html')?.setAttribute('lang', locale)
}

// 初始化时从 localStorage 读取语言设置
export function setupI18n() {
  const savedLocale = localStorage.getItem('locale') as Locale
  if (savedLocale && SUPPORT_LOCALES.includes(savedLocale)) {
    setLocale(savedLocale)
  }
} 