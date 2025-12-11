<template>
  <div class="app-container">
    <Transition name="fade">
      <div v-if="isLoading" class="loading-overlay">
        <div v-if="showLoaderContent" class="loading-content">
          <h1 class="loading-percentage">{{ percentage }}</h1>
          
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: percentage + '%' }"></div>
          </div>
          <p class="loading-text">MEMUAT INTERFACE</p>
        </div>
      </div>
    </Transition>

    <div v-show="!isLoading" class="main-content">
      <PageHero />
      <About />
      <Skills />
      <Portofolio />
      <Contact />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

]const isClient = typeof window !== 'undefined';
const hasVisited = isClient ? sessionStorage.getItem('hasVisited') : null;

const isLoading = ref(!hasVisited);
const percentage = ref(0);
const showLoaderContent = ref(false);

onMounted(async () => {

  if (isLoading.value) {
    showLoaderContent.value = true;

    const interval = setInterval(() => {
      if (percentage.value < 100) {
        percentage.value += Math.floor(Math.random() * 5) + 1;
        if (percentage.value > 100) percentage.value = 100;
      } else {
        clearInterval(interval);
        
        setTimeout(() => {
          isLoading.value = false;
          if (isClient) sessionStorage.setItem('hasVisited', 'true');

          nextTick(() => {
           
            window.dispatchEvent(new Event('resize'));
          });
          
        }, 500);
      }
    }, 30);
  }
});
</script>

<style scoped>
:root {
  --bg-color: #000000;
  --text-color: #ffffff;
}

.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  width: 300px;
}

.loading-percentage {
  font-family: 'Courier New', Courier, monospace;
  font-size: 5rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  line-height: 1;
}

.loading-text {
  color: #666666;
  font-size: 0.8rem;
  letter-spacing: 4px;
  margin-top: 1.5rem;
  font-family: sans-serif;
  text-transform: uppercase;
}

.progress-bar-container {
  width: 100%;
  height: 2px;
  background-color: #333333;
  margin-top: 15px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #ffffff;
  transition: width 0.1s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>