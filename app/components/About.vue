<template>
  <section id="about"
      class="relative min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black overflow-hidden"
      ref="aboutSection">
      
      <div class="relative w-full max-w-6xl z-10">
          <div class="flex flex-col md:flex-row items-center justify-center w-full 
           bg-white dark:bg-[#0a0a0a] 
           rounded-2xl shadow-xl p-8 md:p-12 
           border border-gray-200 dark:border-white/10             
           shadow-[0_0_1.5rem_0.1rem_rgba(168,85,247,0.15)] 
           dark:shadow-[0_0_2rem_0.1rem_rgba(59,130,246,0.15)]
           transition-all duration-500 hover:shadow-[0_0_2rem_0.2rem_rgba(168,85,247,0.25)] 
           dark:hover:shadow-[0_0_2.5rem_0.2rem_rgba(59,130,246,0.25)]">

              <div class="md:w-1/2">
                  <div class="text-center md:text-left">
                      <span class="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wider uppercase mb-4 border border-gray-200 dark:border-white/10">
                          Personal Bio
                      </span>
                      <h1 ref="titleRef" class="text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
                          About <span class="text-gray-400 dark:text-gray-600">Me.</span>
                      </h1>
                      <div class="space-y-4">
                          <p ref="p1Ref" class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                              Halo! Saya <span class="font-bold text-gray-900 dark:text-white">Dzaky Rahmat
                                  Nurwahid</span>, seorang Software Engineer yang fokus pada pengembangan backend dan
                              antusias mengerjakan tantangan fullstack.
                          </p>

                          <p ref="p2Ref" class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                              Saya percaya bahwa aplikasi yang baik lahir dari keseimbangan antara logika backend yang
                              kuat dan pengalaman front-end yang nyaman.
                          </p>

                          <p ref="p3Ref" class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                              Saya terbiasa menggunakan berbagai teknologi modern untuk membangun aplikasi yang
                              efisien dan mudah dikembangkan.
                          </p>
                      </div>
                  </div>
              </div>

              <div class="md:w-1/2 w-full h-[450px] md:pl-8 mt-12 md:mt-0 
           [--overlay-blur-color:white] dark:[--overlay-blur-color:#0a0a0a]">
                  <DomeGallery :images="[
                      '/assets/me.jpg', '/assets/me2.jpg', '/assets/me3.jpg', '/assets/me4.jpg',
                      '/assets/me5.jpg', '/assets/me6.jpg', '/assets/me7.jpg', '/assets/me8.jpg',
                      '/assets/me9.jpg', '/assets/me10.jpg', '/assets/me11.jpg', '/assets/me12.jpg',
                      '/assets/me13.jpg', '/assets/me14.jpg',
                  ]" :fit="0.8" fit-basis="auto" :min-radius="600" :segments="34" :drag-sensitivity="20"
                      :enlarge-transition-ms="300" :grayscale="true" image-border-radius="30px"
                      opened-image-width="250px" opened-image-height="350px" />
              </div>
          </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const isClient = typeof window !== "undefined";
const aboutSection = ref<HTMLElement | null>(null);

const titleRef = ref<HTMLElement | null>(null);
const p1Ref = ref<HTMLElement | null>(null);
const p2Ref = ref<HTMLElement | null>(null);
const p3Ref = ref<HTMLElement | null>(null);

const splitTextIntoWords = (element: HTMLElement) => {
  if (!element.textContent) return [];
  const words = element.textContent.split(/\s+/).filter(Boolean);
  element.innerHTML = "";

  return words.map((word) => {
      const wordMask = document.createElement("span");
      wordMask.className = "word-mask";
      const wordContent = document.createElement("span");
      wordContent.className = "word-content";
      wordContent.textContent = word;

      if (word === "Me.") {
          wordContent.classList.add("text-gray-400", "dark:text-gray-600");
      }

      wordMask.appendChild(wordContent);
      element.appendChild(wordMask);
      element.appendChild(document.createTextNode(" "));
      return wordContent;
  });
};

const setupAboutAnimation = async () => {
  if (!isClient || !aboutSection.value) return;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  const section = aboutSection.value;
  const title = titleRef.value;
  const p1 = p1Ref.value;
  const p2 = p2Ref.value;
  const p3 = p3Ref.value;

  if (!title || !p1 || !p2 || !p3) return;

  const titleWords = splitTextIntoWords(title);
  const p1Words = splitTextIntoWords(p1);
  const p2Words = splitTextIntoWords(p2);
  const p3Words = splitTextIntoWords(p3);

  const tl = gsap.timeline({
      scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
      },
  });

  tl.from(titleWords, {
      yPercent: 110,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.05,
  });

  tl.from([p1Words, p2Words, p3Words].flat(), {
      yPercent: 110,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.01,
  }, "-=0.4");

  setTimeout(() => {
      ScrollTrigger.refresh();
  }, 100);
};

onMounted(() => {
  if (isClient) {
      setupAboutAnimation();

      window.addEventListener('resize', () => {
      });
  }
});
</script>

<style scoped>
:global(.word-mask) {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-right: 0.25em;
}

:global(.word-content) {
  display: block;
  transform: translateY(0);
}
</style>