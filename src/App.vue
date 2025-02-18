<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const isDarkMode = ref(false)
</script> 