<template>
  <div :class="bgClass">
    <div class="pt-8 pb-16">
      <PillNav
        :items="[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]"
      />
    </div>

    <main class="container mx-auto px-6 py-12">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
// Gunakan useColorMode di script
const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

// Computed buat class background (SSR-safe)
const bgClass = computed(() => isDark.value ? 'bg-gray-900 text-white' : 'bg-gray-50')
</script>