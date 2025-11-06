<template>
    <div class="relative w-full h-screen flex items-center justify-center text-center p-4">

        <div class="flex flex-col items-center gap-8">

            <div>
                <h1 class="text-4xl md:text-5xl font-bold mb-">
                    Hi, Welcome to my code space
                </h1>
            </div>

            <div class="relative flex flex-wrap justify-center items-center gap-[1em]" ref="containerRef">

                <span v-for="(word, index) in words" :key="index" :ref="el => setWordRef(el as HTMLSpanElement, index)"
                    class="relative font-black text-3xl md:text-4xl transition-[filter,color] duration-300 ease-in-out cursor-pointer"
                    :style="{
                        filter: getWordStyle(word, index),
                        '--border-color': borderColor,
                        '--glow-color': glowColor,
                        transition: `filter ${animationDuration}s ease`
                    }">
                    {{ word }}
                </span>

                <motion.div class="top-0 left-0 box-content absolute border-none pointer-events-none" :animate="{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: activeWordIndex == null ? 0 : 1
                }" :transition="{
            duration: animationDuration
        }" :style="{
            '--border-color': borderColor,
            '--glow-color': glowColor
        }">
                    <span
                        class="top-[-10px] left-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-r-0 border-b-0 rounded-[3px] w-4 h-4 transition-none"></span>
                    <span
                        class="top-[-10px] right-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-b-0 border-l-0 rounded-[3px] w-4 h-4 transition-none"></span>
                    <span
                        class="bottom-[-10px] left-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-t-0 border-r-0 rounded-[3px] w-4 h-4 transition-none"></span>
                    <span
                        class="right-[-10px] bottom-[-10px] absolute [filter:drop-shadow(0_0_4px_var(--border-color,#fff))] border-[3px] border-[var(--border-color,#fff)] border-t-0 border-l-0 rounded-[3px] w-4 h-4 transition-none"></span>
                </motion.div>
            </div>

        </div>
       <a href="#about" 
       ref="arrowRef" 
       @click.prevent="scrollToAbout"
       class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </a>
    </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { gsap } from 'gsap';
// 1. Impor ScrollToPlugin
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Daftarkan plugin
gsap.registerPlugin(ScrollToPlugin);

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

// Referensi untuk animasi onMounted
const titleRef = ref<HTMLElement | null>(null);
const buttonsRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);

const scrollToAbout = () => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: "#about",
    ease: "power2.inOut"
  });
};

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

  interval = window.setInterval(() => {
    currentAnimatedIndex.value = (currentAnimatedIndex.value + 1) % animatedIndexes.length;
  }, (animationDuration + pauseBetweenAnimations) * 1000);

  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power3.out',
      opacity: 0,
      y: 30
    }
  });

  tl.from(titleRef.value, {})
    .from(containerRef.value, {}, '-=0.6')
    .from(buttonsRef.value, {}, '-=0.6')
    .from(arrowRef.value, { opacity: 0, y: 0, duration: 1.5, ease: 'sine.inOut' }, '+=0.2');
});

onUnmounted(() => {
  if (interval) {
    window.clearInterval(interval);
  }
});
</script>