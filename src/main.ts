import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import { i18n, setupI18n, setLocale } from './i18n'
import { detectUserLanguage } from './utils/geoLocation'
import LanguageSwitchDialog from './components/LanguageSwitchDialog.vue'

// 初始化多语言设置并检测用户语言
const initializeApp = async () => {
  // 先检测用户语言
  const { detectedLocale, suggestedLocale, countryCode } = await detectUserLanguage()
  setLocale(detectedLocale)
  setupI18n()

  // 创建并初始化应用
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(i18n)

  // 挂载应用
  app.mount('#app')

  // 如果有建议的语言，显示切换提示
  if (suggestedLocale) {
    console.log('Creating language switch dialog...')
    const dialog = document.createElement('div')
    dialog.setAttribute('id', 'language-switch-dialog')
    document.body.appendChild(dialog)
    
    // 创建新的应用实例来挂载对话框
    const dialogApp = createApp(LanguageSwitchDialog, {
      suggestedLocale,
      countryCode,
      onSwitch() {
        console.log('Switching language to:', suggestedLocale)
        setLocale(suggestedLocale)
        localStorage.setItem('locale', suggestedLocale)
        dialogApp.unmount()
        document.body.removeChild(dialog)
      },
      onClose() {
        console.log('Closing language dialog')
        localStorage.setItem('languageSwitchDismissedAt', Date.now().toString())
        dialogApp.unmount()
        document.body.removeChild(dialog)
      }
    })
    
    // 确保对话框应用也使用 i18n
    dialogApp.use(i18n)
    dialogApp.mount(dialog)
    console.log('Language switch dialog mounted')
  }
}

// 初始化应用
initializeApp().catch(error => {
  console.error('Failed to initialize language settings:', error)
}) 