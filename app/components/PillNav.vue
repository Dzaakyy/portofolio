<template>
  <nav class="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl max-w-2xl mx-auto font-medium transition-all duration-300">
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-2">
      <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        P
      </div>
      <span class="hidden md:block text-gray-800 dark:text-white">Portofolio</span>
    </NuxtLink>

    <!-- Pills -->
    <div class="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-full">
      <NuxtLink
        v-for="item in items"
        :key="item.href"
        :to="item.href"
        class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden"
        :class="[
          route.path === item.href
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        <span class="relative z-10">{{ item.label }}</span>
        <!-- Active Dot -->
        <span
          v-if="route.path === item.href"
          class="absolute bottom-1 left-1/2 w-1 h-1 rounded-full -translate-x-1/2"
          :class="route.path === item.href ? 'bg-white dark:bg-black' : ''"
        />
      </NuxtLink>
    </div>

    <!-- Dark Mode Toggle (Client-Only) -->
    <ClientOnly>
      <button
        @click="toggleDark"
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        <span class="text-xl">{{ isDark ? '🌙' : '☀️' }}</span>
      </button>
    </ClientOnly>
  </nav>
</template>

<script setup>
const route = useRoute()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.preference === 'dark')

const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

defineProps({
  items: { type: Array, required: true }
})
</script>

<style scoped>
a span {
  transition: transform 0.2s ease;
}
a:hover span {
  transform: translateY(-2px);
}
</style>