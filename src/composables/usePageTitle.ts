import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'

export function usePageTitle() {
  const { t } = useI18n()
  const route = useRoute()

  const updateTitle = () => {
    const titleKey = route.meta.titleKey as string
    document.title = titleKey ? t(titleKey) : 'Tiotecno'
  }

  watchEffect(updateTitle)

  return {
    updateTitle
  }
} 