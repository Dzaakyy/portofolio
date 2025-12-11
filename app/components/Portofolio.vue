<template>
  <section id="portofolio" class="relative py-20 md:py-28 px-4 bg-white dark:bg-black overflow-visible pb-40"
    ref="portfolioSection">

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px] dark:bg-blue-900/20">
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">

      <div class="text-center mb-16 md:mb-24 transition-all duration-500 ease-out"
        :class="{ 'blur-[2px] opacity-60 scale-[0.98]': hoveredIndex !== null }">
        <span
          class="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wider uppercase mb-4 border border-gray-200 dark:border-white/10"
          ref="subtitleRef">
          Selected Works
        </span>
        <h2 class="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight" ref="titleRef">
          My <span class="text-gray-400 dark:text-gray-600">Portfolio.</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start relative" ref="gridRef">

        <div v-for="(project, index) in allProjects" :key="project.id" class="wrapper-item relative w-full perspective-1000 transition-all duration-500 ease-out
                    
                    /* PERBAIKAN DI SINI: Ubah h-[28rem] jadi h-[23rem] */
                    h-[23rem]" @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null" :class="[
                      hoveredIndex !== null && hoveredIndex !== index ? 'blur-[3px] opacity-50 scale-[0.95] grayscale-[0.8]' : '',
                      hoveredIndex === index ? 'z-50' : 'z-0'
                    ]" :data-index="index" :ref="el => setPortfolioItemRef(el, index)">

          <div class="group/card absolute top-0 left-0 w-full rounded-2xl border border-gray-200 dark:border-white/10 
                      bg-white dark:bg-[#0a0a0a]
                      transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-top h-full 
                      hover:h-auto hover:min-h-full
                      hover:shadow-[0_0_1.5rem_0.1rem_rgba(168,85,247,0.4)]
                      dark:hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.4)]
                      hover:ring-1 hover:ring-purple-500/50 
                      dark:hover:ring-blue-500/30
                      ">

            <div
              class="relative h-48 w-full overflow-hidden rounded-t-2xl border-b border-gray-100 dark:border-white/5">
              <div
                class="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 dark:group-hover/card:bg-white/5 transition-colors duration-500 z-10">
              </div>

              <img
                class="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/card:scale-110"
                :src="project.imageUrl" :alt="project.title">
            </div>

            <div class="p-6 flex flex-col bg-white dark:bg-[#0a0a0a] rounded-b-2xl h-[calc(100%-12rem)]">

              <h3
                class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors duration-300">
                {{ project.title }}
              </h3>

              <div class="relative">
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed 
                           line-clamp-3 group-hover/card:line-clamp-none transition-all duration-300">
                  {{ project.description }}
                </p>
                <div
                  class="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent group-hover/card:opacity-0 transition-opacity duration-300">
                </div>
              </div>

              <div class="mt-4 group-hover/card:mt-6 transition-all"></div>

              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.tags" :key="tech"
                  class="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                  {{ tech }}
                </span>
              </div>

              <div
                v-if="(project.githubUrl && project.githubUrl !== '#') || (project.liveUrl && project.liveUrl !== '#')"
                class="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center gap-4 mt-auto 
                          opacity-100 group-hover/card:opacity-100 transition-opacity duration-300">

                <a v-if="project.githubUrl && project.githubUrl !== '#'" :href="project.githubUrl" target="_blank"
                  class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.85-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z"
                      clip-rule="evenodd" />
                  </svg>
                  Code
                </a>

                <a v-if="project.liveUrl && project.liveUrl !== '#'" :href="project.liveUrl" target="_blank"
                  class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const portfolioSection = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const gridRef = ref(null)
const portfolioItemRefs = ref([])

const hoveredIndex = ref(null)

let hasAnimatedTitle = false
let observer = null
let itemObservers = []
let animatedItems = new Set()

const allProjects = ref([
  { id: 1, title: 'Manajemen KBK', description: 'Sistem Manajemen KBK berbasis web yang dirancang untuk mempermudah pengelolaan Kelompok Bidang Keahlian (KBK). Fitur meliputi pengelolaan dosen KBK, data keahlian, serta monitoring struktur organisasi. Sistem ini membantu kepala prodi dalam memetakan keahlian dosen secara real-time dan akurat.', imageUrl: '/assets/manajemen-kbk.png', tags: ['PHP', 'Laravel', 'MySQL'], githubUrl: 'https://github.com/farhanmuzakki213/Manajemen_KBK' },
  { id: 2, title: 'Penjadwalan Sidang', description: 'Aplikasi web yang digunakan untuk mengatur jadwal sidang secara efisien dan otomatis. Sistem ini mendukung pengaturan ruang, peserta sidang, dosen penguji, serta notifikasi jadwal. Menghindari bentrok jadwal antar dosen dan memaksimalkan penggunaan ruangan kampus.', imageUrl: '/assets/penjadwalan-sidang.png', tags: ['PHP', 'Laravel', 'MySQL'], githubUrl: 'https://github.com/Dzaakyy/penjadwalan-sidang' },
  { id: 3, title: 'Pendeteksi Penyakit Mangga', description: 'Aplikasi mobile berbasis Flutter yang mampu mendeteksi penyakit pada daun mangga menggunakan teknologi Machine Learning (TensorFlow Lite). Pengguna cukup memotret daun untuk hasil diagnosa instan beserta saran penanganan penyakitnya.', imageUrl: '/assets/penyakit-daun-mangga.png', tags: ['Flutter', 'ML', 'MySQL'], githubUrl: 'https://github.com/Dzaakyy/capstone-project-apps' },
  { id: 5, title: 'Web Perpustakaan', description: 'Web perpustakaan modern dengan Vue.js dan Node.js. Fitur lengkap: manajemen buku, peminjaman, role admin-pengguna, riwayat transaksi, dan pencarian canggih. Menggunakan Docker untuk kemudahan deployment dan skalabilitas.', imageUrl: '/assets/perpustakaan.png', tags: ['Vue', 'Node JS', 'Docker', 'MySQL'], githubUrl: 'https://github.com/Taufiqurrahman10/uas-topik-khusus-perpustakaan' },
  { id: 6, title: 'Winboard', description: 'Platform internal perusahaan berbasis web untuk meningkatkan engagement karyawan melalui leaderboard mingguan, challenge, dan sistem poin. Dilengkapi dengan animasi interaktif dan update data real-time.', imageUrl: '/assets/winboard.png', tags: ['TypeScript', 'React', 'Node JS', 'PostgreSQL'], liveUrl: 'https://winboard.wesclic.com' },
  { id: 7, title: 'Muslim Super App', description: 'Aplikasi all-in-one untuk umat Islam: sosial media, chat real-time, marketplace, Al-Qur\'an digital, dan jadwal sholat otomatis. Dibangun dengan arsitektur microservices untuk performa tinggi.', imageUrl: '/assets/MSA.png', tags: ['Flutter', 'WebSocket', 'PostgreSQL'], },
])

const setPortfolioItemRef = (el, index) => {
  if (el) {
    portfolioItemRefs.value[index] = el
    if (!animatedItems.has(index)) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(50px)'
    }
  }
}

const animatePortfolioItem = (item, index) => {
  if (animatedItems.has(index)) return
  const itemsPerRow = getItemsPerRow()
  const rowIndex = Math.floor(index / itemsPerRow)
  const columnIndex = index % itemsPerRow
  const totalDelay = (rowIndex * 150) + (columnIndex * 100)

  setTimeout(() => {
    item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    item.style.opacity = '1'
    item.style.transform = 'translateY(0)'
    animatedItems.add(index)

    setTimeout(() => {
      item.style.transform = '';
      item.style.transition = '';
    }, 1000);
  }, totalDelay)
}

const resetPortfolioItemState = (item) => {
  item.style.transition = 'none'
  item.style.opacity = '0'
  item.style.transform = 'translateY(50px)'
}

const getItemsPerRow = () => {
  const width = window.innerWidth
  if (width >= 1024) return 3
  if (width >= 640) return 2
  return 1
}

const initializeAnimationState = () => {
  if (!titleRef.value || !subtitleRef.value) return;
  [titleRef.value, subtitleRef.value].forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  })
}

const animateTitleOnLoad = () => {
  if (!titleRef.value || !subtitleRef.value) return;
  setTimeout(() => {
    titleRef.value.style.opacity = '1'
    titleRef.value.style.transform = 'translateY(0)'
  }, 300)
  setTimeout(() => {
    subtitleRef.value.style.opacity = '1'
    subtitleRef.value.style.transform = 'translateY(0)'
  }, 600)
}

const setupIntersectionObserver = () => {
  if (!portfolioSection.value) return;
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasAnimatedTitle) {
          animateTitleOnLoad();
          hasAnimatedTitle = true;
        }
        setupAllPortfolioItemObservers()
      } else {
        hasAnimatedTitle = false
        animatedItems.clear()
        if (titleRef.value) { titleRef.value.style.opacity = '0'; titleRef.value.style.transform = 'translateY(30px)'; }
        if (subtitleRef.value) { subtitleRef.value.style.opacity = '0'; subtitleRef.value.style.transform = 'translateY(30px)'; }
        portfolioItemRefs.value.forEach(item => { if (item) resetPortfolioItemState(item) })
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  observer.observe(portfolioSection.value);
};

const setupPortfolioItemObserver = (item, index) => {
  const existingObserver = itemObservers[index]
  if (existingObserver) existingObserver.disconnect()
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animatedItems.has(index)) {
        animatePortfolioItem(item, index)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  itemObserver.observe(item)
  itemObservers[index] = itemObserver
}

const setupAllPortfolioItemObservers = () => {
  portfolioItemRefs.value.forEach((item, index) => {
    if (!item) return
    setupPortfolioItemObserver(item, index)
  })
}

onMounted(() => {
  nextTick(() => {
    initializeAnimationState();
    setupIntersectionObserver();
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  itemObservers.forEach(observer => observer && observer.disconnect())
})
</script>