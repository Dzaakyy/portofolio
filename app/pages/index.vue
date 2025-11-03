<template>
  <div class="relative w-full h-screen flex items-center justify-center text-center p-4">

    <div class="flex flex-col items-center gap-8">

      <div>
        <h1 class="text-4xl md:text-5xl font-bold mb-">
          Hi, Welcome to my code space
        </h1>
      </div>

      <div class="relative flex flex-wrap justify-center items-center gap-[1em]" ref="containerRef">
        
        <span
          v-for="(word, index) in words"
          :key="index"
          :ref="el => setWordRef(el as HTMLSpanElement, index)"
          class="relative font-black text-3xl md:text-4xl transition-[filter,color] duration-300 ease-in-out cursor-pointer"
          :style="{
            filter: getWordStyle(word, index),
            '--border-color': borderColor,
            '--glow-color': glowColor,
            transition: `filter ${animationDuration}s ease`
          }"
        >
          {{ word }}
        </span>

        <motion.div
          class="top-0 left-0 box-content absolute border-none pointer-events-none"
          :animate="{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
            opacity: activeWordIndex == null ? 0 : 1
          }"
          :transition="{
            duration: animationDuration
          }"
          :style="{
            '--border-color': borderColor,
            '--glow-color': glowColor
          }"
        >
          <span class="top-[-10px] left-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-r-0 border-b-0 rounded-[3px] w-4 h-4 transition-none"></span>
          <span class="top-[-10px] right-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-b-0 border-l-0 rounded-[3px] w-4 h-4 transition-none"></span>
          <span class="bottom-[-10px] left-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-t-0 border-r-0 rounded-[3px] w-4 h-4 transition-none"></span>
          <span class="right-[-10px] bottom-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-t-0 border-l-0 rounded-[3px] w-4 h-4 transition-none"></span>
        </motion.div>
      </div>
      <div class="flex items-center justify-center gap-4 z-10">
        <a 
          href="/path/to/your-cv.pdf" download
          class="py-2 px-5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Download CV
        </a>
        <a
          href="mailto:dzaky@example.com" class="py-2 px-5 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300"
        >
          Let's Talk
        </a>
      </div>

    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce cursor-pointer">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
 <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
 </svg>
</div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

const words = ['Web', 'Mobile', 'Backend'];
const animatedWords = ['Web', 'Mobile', 'Backend'];
const animatedIndexes = [0, 1, 2];

const blurAmount = 3;
const borderColor = "blue";
const glowColor = "rgba(0, 0, 255, 0.6)";
const animationDuration = 2;
const pauseBetweenAnimations = 1;

const currentAnimatedIndex = ref(0);
const activeWordIndex = computed(() => animatedIndexes[currentAnimatedIndex.value]);

const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const wordRefs = ref<HTMLSpanElement[]>([]);
const focusRect = ref({ x: 0, y: 0, width: 0, height: 0 });
let interval: number | null = null;

const getWordStyle = (word: string, index: number) => {
  const isStatic = !animatedWords.includes(word);
  if (isStatic) {
    return 'blur(0px)';
  }


  if (index !== activeWordIndex.value) {
    return `blur(${blurAmount}px)`;
  }
  
  return 'blur(0px)';
};

watch(
  activeWordIndex,
  async (newActiveIndex) => {
        if (typeof newActiveIndex === 'undefined') {
      return;
    }
    const containerEl = containerRef.value;
    const currentWordEl = wordRefs.value[newActiveIndex];
    
    if (!currentWordEl || !containerEl) return;
    
    await nextTick();

    const parentRect = containerEl.getBoundingClientRect();
    const activeRect = currentWordEl.getBoundingClientRect();

    focusRect.value = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    };
  }
);

const setWordRef = (el: HTMLSpanElement | null, index: number) => {
  if (el) {
    wordRefs.value[index] = el;
  }
};

onMounted(async () => {
  await nextTick();

  const initialActiveIndex = activeWordIndex.value;
  const containerEl = containerRef.value;

      if (typeof initialActiveIndex === 'undefined') {
    return;
  }

  const initialWordEl = wordRefs.value[initialActiveIndex];
  
  if (initialWordEl && containerEl) {
    const parentRect = containerEl.getBoundingClientRect();
    const activeRect = initialWordEl.getBoundingClientRect();

    focusRect.value = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    };
  }

    interval = setInterval(() => {
    currentAnimatedIndex.value = (currentAnimatedIndex.value + 1) % animatedIndexes.length;
  }, (animationDuration + pauseBetweenAnimations) * 1000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>