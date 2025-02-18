<template>
  <footer class="py-8 border-t dark-border">
    <div class="container mx-auto px-4">
      <div class="flex flex-row justify-between items-center">
        <!-- 左侧版权信息 -->
        <div class="text-sm dark-text-secondary text-left">
          {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
        </div>
        
        <!-- 右侧语言切换下拉菜单 -->
        <div 
          class="relative inline-block text-left"
          @mouseenter="isOpen = true"
          @mouseleave="isOpen = false"
        >
          <button 
            class="flex items-center space-x-2 text-sm dark-text-secondary px-3 py-2 rounded-md 
              bg-transparent border border-transparent
              transition-all duration-200 ease-in-out
              hover:text-white hover:border-[var(--border-primary)] hover:bg-[#2a2a2a]/50
              focus:outline-none focus:ring-1 focus:ring-[var(--border-primary)]"
          >
            <svg 
              class="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h16.8" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>
            <span>{{ t('footer.language') }}</span>
            <svg
              class="w-5 h-5 transition-transform duration-200"
              :class="{ 'rotate-180': isOpen }"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </button>
          
          <!-- 下拉菜单 -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div 
              v-show="isOpen"
              class="absolute right-0 bottom-full mb-2 py-1 w-36 bg-[#1a1a1a] rounded-lg shadow-lg border border-[var(--border-primary)] z-50 backdrop-blur-sm after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-2"
            >
              <button
                v-for="locale in SUPPORT_LOCALES"
                :key="locale"
                @click="changeLang(locale)"
                class="w-full text-left px-4 py-2 text-sm dark-text-secondary hover:text-white hover:bg-[#2a2a2a] transition-colors"
                :class="{ 'text-white': locale === currentLocale }"
              >
                {{ t('footer.language', {}, { locale }) }}
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, type Locale, SUPPORT_LOCALES } from '@/i18n'

const { t, locale: currentLocale } = useI18n()
const isOpen = ref(false)

const changeLang = (lang: Locale) => {
  setLocale(lang)
  isOpen.value = false
}
</script>

<style scoped>
/* 添加过渡动画 */
.rotate-180 {
  transform: rotate(180deg);
}
</style> 