<template>
    <div>
        <Aurora :color-stops="auroraColors" :amplitude="1.0" :blend="0.5" :speed="1.0" :intensity="1.0" />

        <PillNav :items="[
            { label: 'Home', href: '#' },
            { label: 'About', href: '#about' },
            { label: 'Portofolio', href: '#portofolio' },
            { label: 'Contact', href: '#contact' }
        ]" activeHref="/" :baseColor="baseColor" :pillColor="pillColor" :hoveredPillTextColor="hoveredPillTextColor"
            :pillTextColor="pillTextColor" />

    <main>
      <PageIndex />
      <PageAbout />
      <PagePortofolio />
      <PageContact />
    </main>
      

    </div>
</template>

<script setup lang="ts">

import PageIndex from '~/pages/index.vue'
import PageAbout from '~/pages/about.vue'
import PagePortofolio from '~/pages/portofolio.vue'
import PageContact from '~/pages/contact.vue'
import { computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const baseColor = computed(() => {
    return colorMode.value === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.1)'
})
const pillColor = computed(() => {
    return colorMode.value === 'dark' ? '#ffffff' : '#000000'
})
const hoveredPillTextColor = computed(() => {
    return colorMode.value === 'dark' ? '#000000' : '#ffffff'
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

</script>