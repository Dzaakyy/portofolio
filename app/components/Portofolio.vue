<template>
  <section id="portofolio" class="py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-4xl sm:text-5xl font-bold tracking-tight
                   text-gray-900 dark:text-white">
          My Portfolio
        </h2>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Beberapa proyek pilihan yang pernah saya kerjakan.
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div 
          v-for="project in displayedProjects" 
          :key="project.id" 
          class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl overflow-hidden
                 transform transition-all duration-500 
                 hover:shadow-xl hover:-translate-y-2 
                 dark:hover:shadow-3xl dark:hover:shadow-blue-500/40" 
        >
          <div class="relative h-56 w-full overflow-hidden">
            <img 
              class="w-full h-full object-cover object-center 
                     transition-transform duration-500 group-hover:scale-110" 
              :src="project.imageUrl" 
              :alt="project.title"
            >
          </div>
          
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-base mb-6">
              {{ project.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tech in project.tags" 
                :key="tech"
                class="inline-block bg-gray-100 text-blue-700 
                       dark:bg-gray-700 dark:text-blue-300 
                       text-xs font-semibold px-3 py-1 rounded-full"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6">
              <a 
                :href="project.githubUrl" 
                target="_blank"
                class="flex items-center gap-2 text-gray-500 hover:text-blue-600 
                       dark:text-gray-400 dark:hover:text-blue-400 
                       font-medium transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.85-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" clip-rule="evenodd" /></svg>
                <span>Kode</span>
              </a>
              <a 
                :href="project.liveUrl" 
                target="_blank"
                class="flex items-center gap-2 text-gray-500 hover:text-green-600 
                       dark:text-gray-400 dark:hover:text-green-400 
                       font-medium transition-colors duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
        
      </div> 
      
      <div class="text-center mt-16" v-if="hasMore">
        <button 
          @click="loadMore"
          class="
            px-8 py-3 font-bold 
            bg-transparent border-2 
            border-gray-900 text-gray-900
            dark:border-gray-300 dark:text-gray-300
            transform 
            hover:bg-gray-900 hover:text-white 
            dark:hover:bg-gray-300 dark:hover:text-gray-900
            hover:-translate-y-1
            
            rounded-full        transition-all duration-500  "
        >
          Tampilkan Lebih Banyak
        </button>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const INITIAL_LOAD = 6

const allProjects = ref([
  { id: 1, title: 'Chat Application', description: 'Aplikasi obrolan real-time...', imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-4.0.3&auto=format&fit-crop&w=800&q=60', tags: ['Node.js', 'Vue.js', 'Socket.io'], githubUrl: '#', liveUrl: '#' },
  { id: 2, title: 'Mobile App', description: 'Aplikasi mobile untuk kebutuhan harian...', imageUrl: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?ixlib=rb-4.0.3&auto=format&fit-crop&w=800&q=60', tags: ['Flutter', 'Dart', 'Firebase'], githubUrl: '#', liveUrl: '#' },
  { id: 3, title: 'Proyek Ke-3', description: 'Deskripsi singkat proyek ke-3...', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', tags: ['Laravel', 'PHP', 'API'], githubUrl: '#', liveUrl: '#' },
  { id: 4, title: 'Proyek Ke-4', description: 'Deskripsi singkat proyek ke-4...', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit-crop&w=800&q=60', tags: ['Python', 'TensorFlow', 'CNN'], githubUrl: '#', liveUrl: '#' },
  { id: 5, title: 'Proyek Ke-5', description: 'Deskripsi singkat proyek ke-5...', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit-crop&w=800&q=60', tags: ['Nuxt.js', 'TailwindCSS'], githubUrl: '#', liveUrl: '#' },
  { id: 6, title: 'Proyek Ke-6', description: 'Deskripsi singkat proyek ke-6...', imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&auto=format&fit-crop&w=800&q=60', tags: ['Figma', 'Vue.js'], githubUrl: '#', liveUrl: '#' },
  { id: 7, title: 'Proyek Ke-7', description: 'Deskripsi singkat proyek ke-7...', imageUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', tags: ['React', 'Node.js'], githubUrl: '#', liveUrl: '#' },
  { id: 8, title: 'Proyek Ke-8', description: 'Deskripsi singkat proyek ke-8...', imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', tags: ['PHP', 'MySQL'], githubUrl: '#', liveUrl: '#' },
])

const numDisplayed = ref(INITIAL_LOAD)

const displayedProjects = computed(() => {
  return allProjects.value.slice(0, numDisplayed.value)
})

const hasMore = computed(() => {
  return numDisplayed.value < allProjects.value.length
})

function loadMore() {
  numDisplayed.value = allProjects.value.length
}
</script>