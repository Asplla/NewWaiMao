<template>
  <LoadingOverlay />
  <div id="app" :class="{ dark: isDarkMode }" v-show="!initializing">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { provideLoadingOverlay } from '@/composables/useLoadingOverlay'

const isDarkMode = ref(false)
const initializing = ref(true)

// 提供加载状态
const { show: showLoading, hide: hideLoading } = provideLoadingOverlay()

// 检查应用程序是否准备就绪
const checkAppReady = () => {
  return new Promise<void>((resolve) => {
    // 这里可以添加其他初始化检查
    // 例如：等待字体加载、资源预加载等
    setTimeout(resolve, 1000) // 给一个短暂的延迟以确保所有内容加载完成
  })
}

// 初始化应用
const initializeApp = async () => {
  showLoading('Initializing...')
  try {
    await checkAppReady()
  } finally {
    hideLoading()
    initializing.value = false
  }
}

onMounted(() => {
  initializeApp()
})
</script> 