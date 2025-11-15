<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        
        <div class="progress-ring">
          <svg class="progress-ring__svg" width="120" height="120">
            <circle
              class="progress-ring__circle--bg"
              :r="circleRadius"
              cx="60"
              cy="60"
            />
            <circle
              class="progress-ring__circle--fg"
              :r="circleRadius"
              cx="60"
              cy="60"
              :style="{
                strokeDasharray: circleCircumference,
                strokeDashoffset: strokeDashoffset
              }"
            />
          </svg>
          
          <div class="loading-percentage">
            {{ Math.round(loadingProgress) }}%
          </div>
        </div>
        </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue' // [UBAH] Tambahkan computed

const isLoading = ref(true)
const loadingProgress = ref(0)

// --- [BARU] Logika untuk SVG Progress Ring ---
const circleRadius = 45 // Radius lingkaran (45px)
const circleCircumference = 2 * Math.PI * circleRadius // Keliling lingkaran

// Hitung "offset" goresan (stroke) secara dinamis.
// Ini adalah "trik" yang membuat lingkaran tampak terisi.
const strokeDashoffset = computed(() => {
  return circleCircumference - (loadingProgress.value / 100) * circleCircumference
})
// --- Akhir Logika SVG ---

const simulateLoading = () => {
  const interval = setInterval(() => {
    // Kita buat kenaikan lebih kecil agar animasi lebih smooth
    loadingProgress.value += Math.random() * 5 
    
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      clearInterval(interval)
      
      // Tunggu sebentar (setelah 100%) sebelum hide loading
      setTimeout(() => {
        isLoading.value = false
      }, 500) // Beri waktu 0.5s agar user bisa melihat 100%
    }
  }, 80) // Interval lebih cepat agar lebih halus
}

onMounted(() => {
  simulateLoading()
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

html.dark .loading-overlay {
  background: #000000;
}

.loading-content {
  text-align: center;
  position: relative;
}

/* --- [BARU] Styling untuk Progress Ring --- */
.progress-ring {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 auto;
}

.progress-ring__svg {
  /* Putar -90deg agar progress dimulai dari jam 12 (atas) */
  transform: rotate(-90deg);
}

.progress-ring__circle--bg,
.progress-ring__circle--fg {
  fill: none; /* Kita hanya ingin goresan/stroke, bukan isian */
  stroke-width: 8; /* Ketebalan garis */
}

/* Lingkaran latar belakang (abu-abu) */
.progress-ring__circle--bg {
  stroke: #e5e5e5;
}

html.dark .progress-ring__circle--bg {
  stroke: #333333;
}

/* Lingkaran progress (foreground) */
.progress-ring__circle--fg {
  stroke: #000000; /* Warna utama */
  /* Animasi transisi saat nilai strokeDashoffset berubah */
  transition: stroke-dashoffset 0.2s ease-out;
}

html.dark .progress-ring__circle--fg {
  stroke: #ffffff;
}

/* --- [UBAH] Styling Persentase --- */
.loading-percentage {
  /* Posisikan di tengah lingkaran */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  font-size: 1.5rem; /* Sedikit lebih besar */
  font-weight: 600;
  color: #000000;
  font-family: 'Courier New', monospace;
}

html.dark .loading-percentage {
  color: #ffffff;
}

/* --- [BARU] Animasi Fade-out Bawaan Vue --- */
/* Ini akan menggantikan transisi opacity manual Anda 
  dan bekerja lebih baik dengan v-if
*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>