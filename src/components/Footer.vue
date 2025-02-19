<template>
  <footer class="py-8 md:py-12 border-t dark-border">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <!-- Left Section: Logo, Nav & Copyright -->
        <div class="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
          <!-- Logo & Nav -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <!-- Logo -->
            <a href="/" class="text-xl font-bold dark-text flex items-center">
              <svg class="h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.917 7.848" fill="currentColor">
                <path d="M13.405 7.848q-1.645 0-2.425-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.782.762-2.436.762m0-1.512q.67 0 .96-.336.287-.336.288-1.116 0-.78-.288-1.116-.29-.336-.96-.336-.66 0-.949.336t-.288 1.116T12.456 6t.949.336M2.268 7.728v-6.24H0V0h6.468v1.488H4.2v6.24zm5.004 0v-4.26h-.84L6.6 2.04h2.604v5.688zM7.104 0h2.101v1.489H7.104zm12.841 7.848q-1.056 0-1.554-.54t-.498-1.488V3.504h-.769V2.04h.769V.852l1.932-.516V2.04h1.38l-.084 1.464h-1.296v2.184q0 .408.204.57t.612.162q.348 0 .708-.12v1.307q-.565.24-1.404.24m5.195.001q-1.487 0-2.387-.739-.9-.736-.9-2.225 0-1.356.744-2.16.743-.804 2.232-.804 1.355 0 2.1.696.744.696.744 1.872v1.02H23.64q.132.564.617.786.487.222 1.327.222.468 0 .954-.084t.81-.216v1.26a3.6 3.6 0 0 1-.972.282 8 8 0 0 1-1.236.09m-1.5-3.456h2.353V4.14q0-.42-.253-.666-.252-.246-.851-.246-.696 0-.972.282c-.276.282-.276.482-.276.882m8.016 3.456q-1.525 0-2.382-.744-.859-.745-.858-2.22 0-1.5.894-2.232t2.382-.732q.623 0 1.086.09.46.09.893.294v1.368q-.671-.324-1.571-.324-.84 0-1.278.336t-.439 1.2q0 .804.408 1.17.409.366 1.296.366.877 0 1.597-.36v1.427q-.433.194-.93.277a5.4 5.4 0 0 1-1.098.084m3.011-.12V2.04h1.8l.06.492q.348-.24.877-.426a3.4 3.4 0 0 1 1.128-.186q1.103 0 1.607.528c.504.528.504.896.504 1.632v3.648h-1.932V4.236q0-.48-.204-.684t-.731-.204q-.314 0-.637.144a1.8 1.8 0 0 0-.54.36v3.876zm10.032.12q-1.643 0-2.424-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.781.762-2.436.762m0-1.512q.673 0 .96-.336.288-.336.289-1.116 0-.78-.288-1.116-.289-.336-.96-.336-.66 0-.948.336-.289.336-.288 1.116 0 .78.288 1.116.286.336.948.336"/>
              </svg>
            </a>

            <!-- Navigation Links -->
            <nav class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
              <router-link 
                v-for="item in navigation" 
                :key="item.path"
                :to="item.path + item.hash"
                @click.prevent="handleNavClick($event, item.hash)"
                class="text-sm dark-text-secondary hover:text-white transition-colors"
              >
                {{ t('nav.' + item.name) }}
              </router-link>
            </nav>
          </div>

          <!-- Copyright -->
          <p class="text-sm dark-text-secondary text-center md:text-left">
            {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
          </p>
        </div>

        <!-- Language Switcher -->
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
          <Transition
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
          </Transition>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { navigation } from '../config/navigation'
import { setLocale, type Locale, SUPPORT_LOCALES } from '@/i18n'

const { t, locale: currentLocale } = useI18n()
const isOpen = ref(false)

const changeLang = (lang: Locale) => {
  setLocale(lang)
  isOpen.value = false
}

const activeSection = computed(() => {
  if (typeof window === 'undefined') return ''
  const hash = window.location.hash
  return hash ? hash.substring(1) : ''
})

// 处理导航点击
const handleNavClick = (event: Event, hash: string) => {
  const section = hash.substring(1) || 'home'
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .container {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* 添加过渡动画 */
.rotate-180 {
  transform: rotate(180deg);
}
</style> 