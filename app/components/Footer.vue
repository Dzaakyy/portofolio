<template>
  <footer class="bg-gray-900 text-white py-12 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">&lt;/&gt;</span>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CodeSpace
            </h3>
          </div>
          <p class="text-gray-300 mb-6 max-w-md text-lg">
            Full-stack developer yang passionate dalam menciptakan solusi digital 
            yang inovatif dan user-friendly.
          </p>
          <div class="flex gap-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              target="_blank"
              class="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              :aria-label="`Follow me on ${social.name}`"
            >
              <component 
                :is="social.icon" 
                class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300"
              />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <a 
                :href="link.url" 
                class="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <span class="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-6 text-white">Get in Touch</h4>
          <div class="space-y-4">
            <div v-for="contact in contactInfo" :key="contact.type" class="flex items-center gap-3 text-gray-300">
              <div class="p-2 bg-gray-800 rounded-lg">
                <component :is="contact.icon" class="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">{{ contact.label }}</p>
                <a 
                  :href="contact.href" 
                  class="hover:text-white transition-colors duration-300"
                  :class="contact.type === 'email' ? 'hover:text-purple-300' : ''"
                >
                  {{ contact.value }}
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="border-t border-gray-800 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div class="text-gray-400 text-sm">
            &copy; {{ currentYear }} CodeSpace. All rights reserved.
          </div>

=          <div class="flex gap-6 text-sm">
            <a 
              v-for="link in footerLinks" 
              :key="link.name"
              :href="link.url" 
              class="text-gray-400 hover:text-white transition-colors duration-300"
            >
              {{ link.name }}
            </a>
          </div>

          <button 
            @click="scrollToTop"
            class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 group"
          >
            <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
            Back to Top
          </button>

        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const SocialIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
    </svg>
  `
}

const GithubIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
    </svg>
  `
}

const LinkedinIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  `
}

const InstagramIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fill-rule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.199-1.558-.75-.947-1.011-2.163-.711-3.355.3-1.191 1.108-2.143 2.198-2.69s2.323-.685 3.524-.385c1.201.3 2.153 1.108 2.7 2.198a4.505 4.505 0 01-4.512 5.79zm7.718 1.134a1.134 1.134 0 110-2.268 1.134 1.134 0 010 2.268zM16.2 7.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clip-rule="evenodd"/>
    </svg>
  `
}

const EmailIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  `
}

const PhoneIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  `
}

const LocationIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  `
}

const currentYear = ref(new Date().getFullYear())

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com', icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedinIcon },
  { name: 'Twitter', url: 'https://twitter.com', icon: SocialIcon },
  { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon }
])

const quickLinks = ref([
  { name: 'Home', url: '#home' },
  { name: 'About', url: '#about' },
  { name: 'Portfolio', url: '#portofolio' },
  { name: 'Skills', url: '#skills' },
  { name: 'Contact', url: '#contact' }
])

const contactInfo = ref([
  { 
    type: 'email', 
    label: 'Email', 
    value: 'hello@codespace.dev', 
    href: 'mailto:hello@codespace.dev',
    icon: EmailIcon
  },
  { 
    type: 'phone', 
    label: 'Phone', 
    value: '+62 812-3456-7890', 
    href: 'tel:+6281234567890',
    icon: PhoneIcon
  },
  { 
    type: 'location', 
    label: 'Location', 
    value: 'Jakarta, Indonesia', 
    href: '#',
    icon: LocationIcon
  }
])

const footerLinks = ref([
  { name: 'Privacy Policy', url: '#' },
  { name: 'Terms of Service', url: '#' },
  { name: 'Cookie Policy', url: '#' }
])

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}
</style>