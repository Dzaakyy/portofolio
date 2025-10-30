<template>
    <div>
        <Aurora :color-stops="auroraColors" :amplitude="1.0" :blend="0.5" :speed="1.0" :intensity="1.0" />

        <PillNav :items="[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Services', href: '/services' },
            { label: 'Contact', href: '/contact' }
        ]" activeHref="/" :baseColor="baseColor" :pillColor="pillColor" :hoveredPillTextColor="hoveredPillTextColor"
            :pillTextColor="pillTextColor" />

        <NuxtPage />

        <button @click="toggleTheme($event)" aria-label="Ganti Tema"
            class="fixed bottom-4 right-4 z-[9999] p-2 rounded-full"
            :style="{ background: pillColor, color: pillTextColor }">
            <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25 2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25A2.25 2.25 0 0012 12z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const baseColor = computed(() => {
    return colorMode.value === 'dark' ? '#000000' : '#ffffff'
})
const pillColor = computed(() => {
    return colorMode.value === 'dark' ? '#ffffff' : '#000000'
})
const hoveredPillTextColor = computed(() => {
    return colorMode.value === 'dark' ? '#ffffff' : '#000000'
})
const pillTextColor = computed(() => {
    return colorMode.value === 'dark' ? '#000000' : '#ffffff'
})

const auroraColors = computed(() => {
    if (colorMode.value === 'dark') {
        return ['#1E1B4B', '#3730A3', '#4F46E5']
    } else {
        return ['#7B7FD3', '#364ED9', '#0096DC']
    }
})

const toggleTheme = (event: MouseEvent) => {
    const x = event.clientX
    const y = event.clientY

    document.documentElement.style.setProperty('--clip-x', `${x}px`)
    document.documentElement.style.setProperty('--clip-y', `${y}px`)

    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>