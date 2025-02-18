import type { Locale } from '@/i18n'
import { SUPPORT_LOCALES } from '@/i18n'

export interface LanguageDetectionResult {
  detectedLocale: 'en' | 'zh' | 'es'
  suggestedLocale?: 'en' | 'zh' | 'es'
  countryCode?: string
}

// 语言映射表
const COUNTRY_LANGUAGE_MAP: Record<string, Locale> = {
  CN: 'zh',
  HK: 'zh',
  TW: 'zh',
  MO: 'zh',
  JP: 'en',
  KR: 'en',
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  PE: 'es',
  CL: 'es',
  // 可以添加更多国家代码映射
}

const IP_APIS = [
  'https://api.seeip.org/geoip',
  'https://api.myip.com',
  'https://ip-api.com/json'
]

async function getLocationInfo() {
  for (const api of IP_APIS) {
    try {
      const response = await fetch(api, { mode: 'cors' })
      const data = await response.json()
      // 根据不同 API 返回格式获取国家代码
      const countryCode = data.country_code || data.country || data.countryCode
      if (countryCode) {
        // 确保返回大写的两字母国家代码
        const code = countryCode.length > 2 ? countryCode.slice(0, 2) : countryCode
        return code.toUpperCase()
      }
    } catch (error) {
      continue
    }
  }
  // 如果所有 API 都失败，使用浏览器语言作为后备方案
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('zh') ? 'CN' : 'US'
}

// 获取用户地理位置和设置语言
export async function detectUserLanguage(): Promise<LanguageDetectionResult> {
  try {
    // 首先检查 localStorage 是否已有语言设置
    const savedLocale = localStorage.getItem('locale')

    // 如果有保存的语言设置
    if (savedLocale && SUPPORT_LOCALES.includes(savedLocale as Locale)) {
      // 检查是否在禁止提示期内
      const lastDismissTime = localStorage.getItem('languageSwitchDismissedAt')
      if (lastDismissTime) {
        const dismissedAt = parseInt(lastDismissTime)
        const now = Date.now()
        if (now - dismissedAt < 12 * 60 * 60 * 1000) {
          return { detectedLocale: savedLocale as 'en' | 'zh' | 'es' }
        }
      }

      // 尝试获取地理位置
      const countryCode = await getLocationInfo()
      const geoLocale = COUNTRY_LANGUAGE_MAP[countryCode] || 'en'

      // 如果检测到的语言与保存的语言不同，提供建议切换
      if (geoLocale !== savedLocale) {
        return {
          detectedLocale: savedLocale as 'en' | 'zh' | 'es',
          suggestedLocale: geoLocale,
          countryCode
        }
      }
      // 如果语言相同，直接返回保存的语言
      return { detectedLocale: savedLocale as 'en' | 'zh' | 'es' }
    }

    // 首次访问的用户，直接使用检测到的语言
    // 尝试获取地理位置
    const countryCode = await getLocationInfo()
    const detectedLocale = COUNTRY_LANGUAGE_MAP[countryCode] || 'en'
    return { detectedLocale, countryCode }
  } catch (error) {
    return { detectedLocale: 'en' } // 发生错误时默认使用英语
  }
} 