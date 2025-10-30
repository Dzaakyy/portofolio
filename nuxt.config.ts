// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  colorMode: {
    preference: 'light',
    classSuffix: ''
  },
  experimental: {
    viewTransition: true
  }
})