<template>
  <div 
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    :class="{ 'opacity-0 pointer-events-none': !visible }"
  >
    <!-- Logo 容器 -->
    <div class="animate-pulse">
      <svg class="h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.917 7.848" fill="currentColor">
        <path d="M13.405 7.848q-1.645 0-2.425-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.782.762-2.436.762m0-1.512q.67 0 .96-.336.287-.336.288-1.116 0-.78-.288-1.116-.29-.336-.96-.336-.66 0-.949.336t-.288 1.116T12.456 6t.949.336M2.268 7.728v-6.24H0V0h6.468v1.488H4.2v6.24zm5.004 0v-4.26h-.84L6.6 2.04h2.604v5.688zM7.104 0h2.101v1.489H7.104zm12.841 7.848q-1.056 0-1.554-.54t-.498-1.488V3.504h-.769V2.04h.769V.852l1.932-.516V2.04h1.38l-.084 1.464h-1.296v2.184q0 .408.204.57t.612.162q.348 0 .708-.12v1.307q-.565.24-1.404.24m5.195.001q-1.487 0-2.387-.739-.9-.736-.9-2.225 0-1.356.744-2.16.743-.804 2.232-.804 1.355 0 2.1.696.744.696.744 1.872v1.02H23.64q.132.564.617.786.487.222 1.327.222.468 0 .954-.084t.81-.216v1.26a3.6 3.6 0 0 1-.972.282 8 8 0 0 1-1.236.09m-1.5-3.456h2.353V4.14q0-.42-.253-.666-.252-.246-.851-.246-.696 0-.972.282c-.276.282-.276.482-.276.882m8.016 3.456q-1.525 0-2.382-.744-.859-.745-.858-2.22 0-1.5.894-2.232t2.382-.732q.623 0 1.086.09.46.09.893.294v1.368q-.671-.324-1.571-.324-.84 0-1.278.336t-.439 1.2q0 .804.408 1.17.409.366 1.296.366.877 0 1.597-.36v1.427q-.433.194-.93.277a5.4 5.4 0 0 1-1.098.084m3.011-.12V2.04h1.8l.06.492q.348-.24.877-.426a3.4 3.4 0 0 1 1.128-.186q1.103 0 1.607.528c.504.528.504.896.504 1.632v3.648h-1.932V4.236q0-.48-.204-.684t-.731-.204q-.314 0-.637.144a1.8 1.8 0 0 0-.54.36v3.876zm10.032.12q-1.643 0-2.424-.762t-.78-2.202q0-1.428.787-2.196.785-.768 2.418-.768 1.643 0 2.43.768.785.768.786 2.196 0 1.44-.78 2.202-.781.762-2.436.762m0-1.512q.673 0 .96-.336.288-.336.289-1.116 0-.78-.288-1.116-.289-.336-.96-.336-.66 0-.948.336-.289.336-.288 1.116 0 .78.288 1.116.286.336.948.336"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingOverlay } from '@/composables/useLoadingOverlay'

const { visible, message } = useLoadingOverlay()
</script>

<style scoped>
.fixed {
  transition: opacity 0.3s ease;
}

.opacity-0 {
  opacity: 0;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style> 