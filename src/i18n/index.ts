import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'
import es from './locales/es'
import { watch } from 'vue'
import type { Router } from 'vue-router'

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

// 使用异步加载语言包
const loadLocaleMessages = async (locale: Locale) => {
  const messages = await import(`./locales/${locale}.ts`)
  return messages.default
}

export const setLocale = async (locale: Locale) => {
  try {
    // 验证语言是否支持
    if (!SUPPORT_LOCALES.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }

    const messages = await loadLocaleMessages(locale)
    i18n.global.setLocaleMessage(locale, messages)
    i18n.global.locale.value = locale
    
    // 保存到 localStorage
    localStorage.setItem('locale', locale)
    
    // 更新 HTML lang 属性
    document.querySelector('html')?.setAttribute('lang', locale)
    
    // 更新页面标题
    const titleKey = 'meta.home.title'
    document.title = i18n.global.t(titleKey)
    
    // 更新 meta 标签
    const metaConfig = await import('@/utils/seo').then(m => m.getMetaConfig(locale))
    document.querySelector('meta[name="description"]')?.setAttribute('content', metaConfig.description)
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', metaConfig.keywords)
  } catch (error) {
    console.error(`Failed to load locale: ${locale}`, error)
  }
}

// 初始化时从 localStorage 读取语言设置
export function setupI18n() {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && SUPPORT_LOCALES.includes(savedLocale as Locale)) {
    setLocale(savedLocale as Locale)
  }

  return i18nInstance
} 