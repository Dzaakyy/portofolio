<template>
  <div class="relative w-full h-screen flex items-center justify-center text-center p-4">

    <div class="flex flex-col items-center gap-8">

      <div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3">
          Mengubah Ide Menjadi Solusi Digital
        </h1>
      </div>

      <div class="relative flex flex-wrap justify-center items-center gap-[1em]" ref="containerRef">
        
        <span
          v-for="(word, index) in words"
          :key="index"
          :ref="el => setWordRef(el as HTMLSpanElement, index)"
          class="relative font-black text-5xl md:text-6xl transition-[filter,color] duration-300 ease-in-out cursor-pointer"
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

    </div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const words = ['Web', '&','Mobile', 'Developer'];
const animatedWords = ['Web', 'Mobile'];
const animatedIndexes = [0, 2];

const blurAmount = 5;
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
  async () => {
    const activeIndex = activeWordIndex.value;
    if (activeIndex == null) return;

    const containerEl = containerRef.value;
    const currentWordEl = wordRefs.value[activeIndex];
    
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
  },
  { immediate: true }
);

const setWordRef = (el: HTMLSpanElement | null, index: number) => {
  if (el) {
    wordRefs.value[index] = el;
  }
};

onMounted(async () => {
  await nextTick();
  
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