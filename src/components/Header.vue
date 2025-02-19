<template>
    <div>
        <header 
            class="header fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b dark-border"
            :class="{ 'navbar-bg': isScrolled || isMenuOpen }"
        >
            <div class="container w-full h-full mx-auto px-6 flex justify-between items-center">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <a href="/" class="text-xl font-bold dark-text flex items-center"> 
                            <svg class="h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.917 7.848" fill="currentColor">
                                <path d="M13.405 7.848q-1.645 0-2.425-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.782.762-2.436.762m0-1.512q.67 0 .96-.336.287-.336.288-1.116 0-.78-.288-1.116-.29-.336-.96-.336-.66 0-.949.336t-.288 1.116T12.456 6t.949.336M2.268 7.728v-6.24H0V0h6.468v1.488H4.2v6.24zm5.004 0v-4.26h-.84L6.6 2.04h2.604v5.688zM7.104 0h2.101v1.489H7.104zm12.841 7.848q-1.056 0-1.554-.54t-.498-1.488V3.504h-.769V2.04h.769V.852l1.932-.516V2.04h1.38l-.084 1.464h-1.296v2.184q0 .408.204.57t.612.162q.348 0 .708-.12v1.307q-.565.24-1.404.24m5.195.001q-1.487 0-2.387-.739-.9-.736-.9-2.225 0-1.356.744-2.16.743-.804 2.232-.804 1.355 0 2.1.696.744.696.744 1.872v1.02H23.64q.132.564.617.786.487.222 1.327.222.468 0 .954-.084t.81-.216v1.26a3.6 3.6 0 0 1-.972.282 8 8 0 0 1-1.236.09m-1.5-3.456h2.353V4.14q0-.42-.253-.666-.252-.246-.851-.246-.696 0-.972.282c-.276.282-.276.482-.276.882m8.016 3.456q-1.525 0-2.382-.744-.859-.745-.858-2.22 0-1.5.894-2.232t2.382-.732q.623 0 1.086.09.46.09.893.294v1.368q-.671-.324-1.571-.324-.84 0-1.278.336t-.439 1.2q0 .804.408 1.17.409.366 1.296.366.877 0 1.597-.36v1.427q-.433.194-.93.277a5.4 5.4 0 0 1-1.098.084m3.011-.12V2.04h1.8l.06.492q.348-.24.877-.426a3.4 3.4 0 0 1 1.128-.186q1.103 0 1.607.528c.504.528.504.896.504 1.632v3.648h-1.932V4.236q0-.48-.204-.684t-.731-.204q-.314 0-.637.144a1.8 1.8 0 0 0-.54.36v3.876zm10.032.12q-1.643 0-2.424-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.781.762-2.436.762m0-1.512q.673 0 .96-.336.288-.336.289-1.116 0-.78-.288-1.116-.289-.336-.96-.336-.66 0-.948.336-.289.336-.288 1.116 0 .78.288 1.116.286.336.948.336"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <MenuButton 
                    class="dark-text-secondary"
                    :is-open="isMenuOpen"
                    @click="isMenuOpen = !isMenuOpen"
                />

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-8">
                    <router-link 
                        v-for="item in navigation" 
                        :key="item.path"
                        :to="item.path + item.hash"
                        @click.native="handleNavClick($event, item.hash)"
                        class="text-sm dark-text-secondary hover:text-white transition-colors"
                        :class="{ 'text-white': activeSection === (item.hash.substring(1) || 'home') }"
                    >
                        {{ t('nav.' + item.name) }}
                    </router-link>
                </nav>
            </div>
        </header>

        <!-- Mobile Navigation -->
        <div 
            class="fixed inset-0 top-[70px] z-30 md:hidden navbar-bg transition-all origin-top transform"
            :class="[
                isMenuOpen 
                    ? 'opacity-100 visible clip-visible duration-400'
                    : 'opacity-0 invisible clip-invisible duration-250'
            ]"
        >
            <nav 
                class="container mx-auto px-6 py-4 flex flex-col space-y-4 transition-all duration-400 transform-gpu overflow-y-auto scrollbar-hidden"
            >
                <router-link 
                    v-for="item in navigation" 
                    :key="item.path"
                    :to="item.path + item.hash"
                    @click.native="handleNavClick($event, item.hash)"
                    class="text-sm dark-text-secondary hover:text-white transition-colors py-2"
                    :class="{ 'text-white': activeSection === item.hash.substring(1) }"
                    @click="isMenuOpen = false"
                >
                    {{ t('nav.' + item.name) }}
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MenuButton from './MenuButton.vue'
import { navigation } from '../config/navigation'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')

// 检查元素是否在视口中
const isElementInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const triggerPoint = windowHeight / 4
    return rect.top <= triggerPoint && rect.bottom >= triggerPoint
}

// 更新当前活动的部分
const updateActiveSection = () => {
    if (window.scrollY < window.innerHeight / 2) {
        activeSection.value = 'home'
        return
    }
    
    const sections = ['services', 'about', 'contact']
    for (const section of sections) {
        const element = document.getElementById(section)
        if (element && isElementInViewport(element)) {
            activeSection.value = section
            return
        }
    }
    
    const lastSection = document.getElementById('contact')
    if (lastSection && lastSection.getBoundingClientRect().bottom <= window.innerHeight) {
        activeSection.value = 'contact'
    } else {
        activeSection.value = ''
    }
}

// 滚动监听函数
const handleScroll = () => {
    isScrolled.value = window.scrollY > 0
    updateActiveSection()
}

// 处理导航点击
const handleNavClick = (event: Event, hash: string) => {
    event.preventDefault()
    const section = hash.substring(1) || 'home'
    const element = document.getElementById(section)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        isMenuOpen.value = false
    })
}
</script>

<style scoped>

</style>
