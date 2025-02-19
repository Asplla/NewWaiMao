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
    setTimeout(resolve, 1000)
  })
}

// 初始化应用
const initializeApp = async () => {
  // 显示加载动画
  showLoading()
  
  try {
    await checkAppReady()
    // 先显示内容
    initializing.value = false
    // 等待一帧确保内容渲染
    await new Promise(resolve => requestAnimationFrame(resolve))
    // 然后隐藏加载动画
    hideLoading()
    // 发出应用就绪事件
    window.dispatchEvent(new Event('app-ready'))
  } catch (error) {
    console.error('Failed to initialize app:', error)
    hideLoading()
  }
}

onMounted(() => {
  initializeApp()
})
</script> 