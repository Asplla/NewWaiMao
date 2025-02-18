<template>
  <div class="dark-bg">
    <Toast :visible="toastVisible" :message="toastMessage" :type="toastType" />
    <!-- Hero Section -->
    <section id="home" class="relative flex items-center justify-center hero bg-primary">
      
      <div class="hero-bg absolute w-full h-full top-0 left-0 right-0 bottom-0">
        <video autoplay loop muted playsinline src="/src/video/glass-animation-5.mp4"></video>
      </div>
      <!-- 内容层 -->
      <div class="relative z-10 text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold hero-title mb-6 leading-tight">
          <div>{{ t('hero.title') }}</div>
          <div>{{ t('hero.subtitle') }}</div>
        </h1>
        <p class="text-xl md:text-2xl dark-text-secondary">
          {{ t('hero.description') }}
        </p>
      </div>
      <!-- 鼠标滚动效果 -->
      <div class="move-down">
        <div class="mouse-wheel"></div>
      </div>
    </section>
    <!-- Services Section -->
    <section id="services" class="py-20 services-section bg-secondary">
      <div class="container mx-auto px-6">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold dark-text mb-4 tracking-tight">
            {{ t('services.title') }}
          </h2>
          <p class="text-xl md:text-2xl dark-text-secondary max-w-2xl mx-auto">
            {{ t('services.subtitle') }}
          </p>
        </div>

        <!-- Services Grid -->
        <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Factory Visit Card -->
          <div class="group relative card rounded-xl p-8 transition-colors duration-300">
            <div class="flex flex-col h-full">
              <div class="mb-6">
                <svg class="w-12 h-12 text-orange-400" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21c1.147 -4.02 1.983 -8.027 2 -12h6c.017 3.973 .853 7.98 2 12" /><path d="M12.5 13h4.5c.025 2.612 .894 5.296 2 8" /><path d="M9 5a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1" /><path d="M3 21l19 0" /></svg>
              </div>
                <h3 class="text-2xl font-bold text-primary mb-4">
                  {{ t('services.items.factory.title') }}
                </h3>
              <p class="text-base text-primary-60 leading-relaxed mb-6">
                  {{ t('services.items.factory.desc') }}
              </p>
            </div>
          </div>

          <!-- Product Sourcing Card -->
          <div class="group relative card rounded-xl p-8 transition-colors duration-300">
            <div class="flex flex-col h-full">
              <div class="mb-6">
                <svg class="w-12 h-12 text-green-400" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
              </div>
                <h3 class="text-2xl font-bold text-primary mb-4">
                  {{ t('services.items.sourcing.title') }}
                </h3>
              <p class="text-base text-primary-60 leading-relaxed mb-6">
                  {{ t('services.items.sourcing.desc') }}
              </p>
            </div>
          </div>

          <!-- Price Negotiations Card -->
          <div class="group relative card rounded-xl p-8 transition-colors duration-300">
            <div class="flex flex-col h-full">
              <div class="text-primary-70 mb-6">
                <svg class="w-12 h-12 text-yellow-400" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 10h-16l5.5 -6" /><path d="M4 14h16l-5.5 6" /></svg>
              </div>
                <h3 class="text-2xl font-bold text-primary mb-4">
                  {{ t('services.items.negotiations.title') }}
                </h3>
              <p class="text-base text-primary-60 leading-relaxed mb-6">
                  {{ t('services.items.negotiations.desc') }}
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why China Section -->
    <section class="py-20 bg-primary">
      <div class="container mx-auto px-6">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            {{ t('map.title') }}
          </h2>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <!-- Left Column - Cards -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Card 1 - Price Advantage -->
            <div class="card rounded-xl p-6">
              <h3 class="text-xl font-bold text-primary mb-3">
                {{ t('map.CompetitivePricing') }}
              </h3>
              <p class="text-primary-60">
                {{ t('map.AccessToCompetitivePricingAndCostEffectiveManufacturingSolutions') }}
              </p>
            </div>

            <!-- Card 2 - Guanxi -->
            <div class="card rounded-xl p-6">
              <h3 class="text-xl font-bold text-primary mb-3">
                {{ t('map.StrongRelationships') }}
              </h3>
              <p class="text-primary-60">
                {{ t('map.EstablishedRelationshipsWithReliableManufacturersAndSuppliers') }}
              </p>
            </div>

            <!-- Card 3 - Mutual Value -->
            <div class="card rounded-xl p-6">
              <h3 class="text-xl font-bold text-primary mb-3">
                {{ t('map.QualityAssurance') }}
              </h3>
              <p class="text-primary-60">
                {{ t('map.RigorousQualityControlAndInspectionProcesses') }}
              </p>
            </div>

            <!-- Card 4 - Time Efficiency -->
            <div class="card rounded-xl p-6">
              <h3 class="text-xl font-bold text-primary mb-3">
                {{ t('map.TimeEfficiency') }}
              </h3>
              <p class="text-primary-60">
                {{ t('map.FastTurnaroundTimesAndEfficientProductionProcesses') }}
              </p>
            </div>
          </div>

          <!-- Right Column - Map -->
          <div class="lg:col-span-3 w-full h-full flex items-center">
            <RegionMap />
          </div>
        </div>
      </div>
    </section>

    <!-- We Offer Section -->
    <section class="py-20 bg-secondary">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            {{ t('weoffer.title') }}
          </h2>
          <p class="text-xl md:text-2xl dark-text-secondary max-w-2xl mx-auto">
            {{ t('weoffer.subtitle') }}
          </p>
        </div>

        <!-- Service Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Translation Card -->
          <div class="card p-8 rounded-2xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5h7" /><path d="M9 3v2c0 4.418 -2.239 8 -5 8" /><path d="M5 9c0 2.144 2.952 3.908 6.7 4" /><path d="M12 20l4 -9l4 9" /><path d="M19.1 18h-6.2" /></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">
                  {{ t('weoffer.items.translate.title') }}
                </h3>
                <p class="text-primary-60">
                  {{ t('weoffer.items.translate.desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Transportation Card -->
          <div class="card p-8 rounded-2xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M18 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 17h-2v-11a1 1 0 0 1 1 -1h14a5 7 0 0 1 5 7v5h-2m-4 0h-8" /><path d="M16 5l1.5 7l4.5 0" /><path d="M2 10l15 0" /><path d="M7 5l0 5" /><path d="M12 5l0 5" /></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">
                  {{ t('weoffer.items.visit.title') }}
                </h3>
                <p class="text-primary-60">
                  {{ t('weoffer.items.visit.desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Accommodation Card -->
          <div class="card p-8 rounded-2xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 6a1 1 0 0 1 .993 .883l.007 .117v6h6v-5a1 1 0 0 1 .883 -.993l.117 -.007h8a3 3 0 0 1 2.995 2.824l.005 .176v8a1 1 0 0 1 -1.993 .117l-.007 -.117v-3h-16v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-11a1 1 0 0 1 1 -1z" /><path d="M7 8a2 2 0 1 1 -1.995 2.15l-.005 -.15l.005 -.15a2 2 0 0 1 1.995 -1.85z" /></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">
                  {{ t('weoffer.items.stay.title') }}
                </h3>
                <p class="text-primary-60">
                  {{ t('weoffer.items.stay.desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tourism Card -->
          <div class="card p-8 rounded-2xl">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" /><path d="M9 4v13" /><path d="M15 7v5.5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-primary mb-2">
                  {{ t('weoffer.items.tourism.title') }}
                </h3>
                <p class="text-primary-60">
                  {{ t('weoffer.items.tourism.desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="py-20 bg-primary">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            {{ t('about.title') }}
          </h2>
        </div>

        <div class="flex justify-center">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div class="w-48 h-48 md:w-72 md:h-72 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mb-8 md:mb-0">
              <img src="/src/img/noavatar.svg" alt="Company Profile" class="w-full h-full object-cover" />
            </div>
            <div class="max-w-3xl">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center md:text-left">
                {{ t('about.WhoAmI') }}
              </h3>
              <div class="grid grid-cols-3 md:flex md:flex-row gap-4 md:gap-24">
                <div class="text-center md:text-left">
                  <div class="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">{{ t('about.years') }}</div>
                  <div class="text-xs md:text-base text-primary-60">{{ t('about.yearsText') }}</div>
                </div>
                <div class="text-center md:text-left">
                  <div class="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">{{ t('about.customers') }}</div>
                  <div class="text-xs md:text-base text-primary-60">{{ t('about.customersText') }}</div>
                </div>
                <div class="text-center md:text-left">
                  <div class="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">{{ t('about.factories') }}</div>
                  <div class="text-xs md:text-base text-primary-60">{{ t('about.factoriesText') }}</div>
                </div>
              </div>
              <p class="text-primary-60 mt-6 md:mt-8 text-center md:text-left text-sm md:text-base">
                {{ t('about.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Us Section -->
    <section id="contact" class="py-20 bg-secondary">
      <div class="container mx-auto px-6">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Contact Us
          </h2>
        </div>

        <!-- Content Container -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <!-- Left Column - Contact Methods -->
          <div class="space-y-8 h-full flex flex-col justify-between">
            <!-- WhatsApp -->
            <div class="card rounded-2xl p-8 hover:bg-primary/50">
              <div class="flex items-center gap-4 mb-4">
                <svg class="w-12 h-12 text-green-500" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.497 4.409a10 10 0 0 1 -10.36 16.828l-.223 -.098l-4.759 .849l-.11 .011a1 1 0 0 1 -.11 0l-.102 -.013l-.108 -.024l-.105 -.037l-.099 -.047l-.093 -.058l-.014 -.011l-.012 -.007l-.086 -.073l-.077 -.08l-.067 -.088l-.056 -.094l-.034 -.07l-.04 -.108l-.028 -.128l-.012 -.102a1 1 0 0 1 0 -.125l.012 -.1l.024 -.11l.045 -.122l1.433 -3.304l-.009 -.014a10 10 0 0 1 1.549 -12.454l.215 -.203a10 10 0 0 1 13.226 -.217m-8.997 3.09a1.5 1.5 0 0 0 -1.5 1.5v1a6 6 0 0 0 6 6h1a1.5 1.5 0 0 0 0 -3h-1l-.144 .007a1.5 1.5 0 0 0 -1.128 .697l-.042 .074l-.022 -.007a4.01 4.01 0 0 1 -2.435 -2.435l-.008 -.023l.075 -.041a1.5 1.5 0 0 0 .704 -1.272v-1a1.5 1.5 0 0 0 -1.5 -1.5" /></svg>
                <span class="text-xl md:text-2xl text-white font-bold">{{ t('contact.methods.whatsapp.title') }}</span>
              </div>
              <p class="text-primary-60 mb-4">{{ t('contact.methods.whatsapp.desc') }}</p>
              <p class="text-white text-lg md:text-xl">{{ t('contact.methods.whatsapp.phone') }}</p>
            </div>

            <!-- Email -->
            <div class="card rounded-2xl p-8 hover:bg-primary/50">
              <div class="flex items-center gap-4 mb-4">
                <svg class="w-12 h-12 text-blue-400" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" /><path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" /></svg>
                <span class="text-xl md:text-2xl text-white font-bold">{{ t('contact.methods.email.title') }}</span>
              </div>
              <p class="text-primary-60 mb-4">{{ t('contact.methods.email.desc') }}</p>
              <p class="text-white text-lg md:text-xl">
                <a :href="`mailto:${t('contact.methods.email.emailName')}@${t('contact.methods.email.emailDomain')}`">
                  {{ t('contact.methods.email.emailName') }}@{{ t('contact.methods.email.emailDomain') }}
                </a>
              </p>
            </div>
          </div>

          <!-- Right Column - Contact Form -->
          <div class="h-full flex flex-col">
            <div class="flex-1 space-y-6">
              <input type="text" :placeholder="t('contact.form.name')"
                v-model="formData.name"
                class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all">
              <input type="email" :placeholder="t('contact.form.email')"
                v-model="formData.email"
                class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all">
              <textarea rows="4" :placeholder="t('contact.form.message')"
                v-model="formData.content"
                class="w-full p-3 md:p-4 rounded-lg bg-primary/50 text-white placeholder-primary-60 border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all resize-none"></textarea>
            </div>
            <div class="mt-6">
              <button
                @click="submitForm"
                :disabled="isSubmitting"
                class="w-full p-3 md:p-4 rounded-lg bg-transparent text-white border border-[var(--border-primary)] 
                transition-all duration-200 ease-in-out 
                hover:bg-white hover:text-black focus:outline-none cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:bg-transparent disabled:hover:text-black">
                <div class="flex items-center justify-center gap-2">
                  <Loading v-if="isSubmitting" size="sm" />
                  <span>{{ isSubmitting ? t('contact.form.sending') : t('contact.form.submit') }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 其他内容将在这里添加 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import RegionMap from '@/components/RegionMap.vue'
import Toast from '@/components/Toast.vue'
import Loading from '@/components/Loading.vue'
import { useToast } from '@/utils/toast'
import { useLoadingOverlay } from '@/composables/useLoadingOverlay'
import { useI18n } from 'vue-i18n'
import { setLocale, type Locale, SUPPORT_LOCALES } from '@/i18n'

const { t, locale: currentLocale } = useI18n()
const { visible: toastVisible, message: toastMessage, type: toastType, showToast } = useToast()
const { show: showLoading, hide: hideLoading } = useLoadingOverlay()

const isSubmitting = ref(false)

// 表单数据
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
  showLoading('Sending message...')

  try {
    // 使用 FormData
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.value.name.trim())
    formDataToSend.append('email', formData.value.email.trim())
    formData.value.content = formData.value.content.trim()

    const response = await fetch('/api/phpinfo.php?mod=sendemail', {
      method: 'POST',
      body: formDataToSend
    })
    
    const text = await response.text()
    console.log('Raw response:', text)
    let data
    try {
      data = JSON.parse(text)
      console.log('Server response:', data)
    } catch (e) {
      showToast({ 
        message: t('message.form.failed'),
        type: 'error' 
      })
      isSubmitting.value = false
      hideLoading()
      return
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
      showToast({ 
        message: data.msg || t('message.form.failed'),
        type: 'error' 
      })
    }
  } catch (error) {
    console.error('Error:', error)
    showToast({ 
      message: t('message.form.networkError'),
      type: 'error' 
    })
  } finally {
    isSubmitting.value = false
    hideLoading()
  }
}

// VH 设置
const setVH = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

const isLoading = ref(true)

// 创建一个方法来检查所有必要的资源是否加载完成
const checkResourcesLoaded = () => {
  // 这里可以添加检查逻辑
  // 例如：检查地图数据是否加载完成
  // 检查其他必要资源是否准备就绪
  return new Promise((resolve) => {
    // 示例：等待地图数据加载
    setTimeout(resolve, 1000)
  })
}

onMounted(async () => {
  setVH()
  window.addEventListener('resize', setVH)
  try {
    await checkResourcesLoaded()
    isLoading.value = false
  } catch (error) {
    console.error('Failed to load resources:', error)
    // 可以在这里添加错误处理逻辑
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', setVH)
})
</script>

<style scoped>
.h-screen {
  height: 100vh;
  /* 移动端浏览器处理 */
  height: calc(var(--vh, 1vh) * 100);
}
</style>