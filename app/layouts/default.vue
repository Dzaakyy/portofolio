<template>
  <div>
    <div ref="themeTransitionRef" class="theme-transition-overlay"></div>
    
    <Aurora :color-stops="auroraColors" :amplitude="1.0" :blend="0.5" :speed="1.0" :intensity="1.0" />

    <PillNav :items="[
        { label: 'Home', href: '#' },
        { label: 'About', href: '#about' },
        { label: 'Portofolio', href: '#portofolio' },
        { label: 'Contact', href: '#contact' }
    ]" activeHref="/" />

    <main>
      <PageIndex />
      <PageAbout />
      <PageSkills />
      <PagePortofolio />
      <PageContact />
    </main>
  </div>
</template>

<script setup lang="ts">
import PageIndex from '~/pages/index.vue'
import PageAbout from '~/pages/about.vue'
import PageSkills from '~/pages/skills.vue'
import PagePortofolio from '~/pages/portofolio.vue'
import PageContact from '~/pages/contact.vue'
import { computed, onMounted, ref } from 'vue'
import { useColorMode } from '#imports'
import { gsap } from 'gsap'

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          var theme = localStorage.getItem('nuxt-color-mode') || 'system';
          if (theme === 'system') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `
    }
  ]
})

declare global {
  interface Window {
    animateThemeTransition?: (x: number, y: number, onComplete: () => void) => void;
  }
}

const colorMode = useColorMode()
const themeTransitionRef = ref<HTMLElement | null>(null)

const auroraColors = computed(() => {
    if (colorMode.value === 'dark') {
        return ['#1E1B4B', '#3730A3', '#4F46E5']
    } else {
        return ['#7B7FD3', '#364ED9', '#0096DC']
    }
})

const animateThemeTransition = (x: number, y: number, onComplete: () => void) => {
    const overlay = themeTransitionRef.value
    if (!overlay) return

    gsap.set(overlay, {
        clipPath: `circle(0% at ${x}px ${y}px)`,
        opacity: 1,
        zIndex: 9999
    })

    gsap.to(overlay, {
        clipPath: `circle(150% at ${x}px ${y}px)`,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
            onComplete()
            gsap.to(overlay, {
                clipPath: `circle(0% at ${x}px ${y}px)`,
                duration: 0.6,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.set(overlay, { opacity: 0, zIndex: -1 })
                }
            })
        }
    })
}

onMounted(() => {
    window.animateThemeTransition = animateThemeTransition
})
</script>

<style scoped>
.theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 15%, rgba(255, 255, 255, 0.9) 100%);
    opacity: 0;
    z-index: -1;
    pointer-events: none;
}

html.dark .theme-transition-overlay {
    background: radial-gradient(circle at center, transparent 15%, rgba(0, 0, 0, 0.9) 100%);
}
</style>