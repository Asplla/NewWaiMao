<template>
    <button 
        class="md:hidden w-11 h-11 -mr-2 flex items-center justify-center"
        @click="$emit('click')"
    >
        <div class="w-[22px] h-[22px] relative">
            <span 
                class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-200"
                :class="[
                    isOpen ? 'top-[10px] rotate-45' : 'top-[3px]',
                ]"
            ></span>
            <span 
                class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-200"
                :class="[
                    isOpen ? 'opacity-0' : 'opacity-100',
                    'top-[10px]'
                ]"
            ></span>
            <span 
                class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-200"
                :class="[
                    isOpen ? 'top-[10px] -rotate-45' : 'top-[17px]',
                ]"
            ></span>
        </div>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
}>()

defineEmits<{
    (e: 'click'): void
}>()
</script> 