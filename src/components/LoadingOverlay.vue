<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div class="flex flex-col items-center gap-4">
        <Loading size="lg" class="text-white" />
        <span class="text-white text-sm">{{ message || 'Loading...' }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'

defineProps<{
  visible: boolean
  message?: string
}>()
</script> 