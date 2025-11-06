<template>
  <section id="about" class="h-screen flex items-center justify-center p-4" ref="aboutSection">
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto">

      <div class="md:w-1/2 text-center md:text-left">
        <h1 ref="titleRef" class="text-4xl lg:text-5xl font-bold mb-4">
          About Me
        </h1>
        <p ref="p1Ref" class="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Halo! Saya Dzaky Rahmat Nurwahid, seorang Software Engineer. Saya memiliki
          ketertarikan mendalam pada pengembangan backend, didorong oleh antusiasme untuk menyelesaikan tantangan
          fullstack. Saya percaya bahwa solusi digital yang luar biasa lahir dari pemahaman menyeluruh yang menjembatani
          antara logika server-side yang kompleks dan pengalaman pengguna front-end yang intuitif.
        </p>
        <p ref="p2Ref" class="text-lg text-gray-700 dark:text-gray-300">
          Saya memiliki pengalaman dengan berbagai teknologi modern untuk membangun
          aplikasi yang skalabel dan efisien.
        </p>
      </div>

      <div ref="cardRef" class="md:w-1/2 flex justify-center md:justify-end">
        <ProfileCard handle="dzaky" status="Online" contact-text="Contact Me" avatar-url="/assets/me.jpg"
          :show-user-info="true" :show-behind-gradient="true" :enable-tilt="true" @contact-click="handleContactClick" />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isClient = typeof window !== 'undefined'
const aboutSection = ref<HTMLElement | null>(null)

const titleRef = ref<HTMLElement | null>(null)
const p1Ref = ref<HTMLElement | null>(null)
const p2Ref = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

const handleContactClick = () => {
  console.log('Contact button clicked!');
};

/**
 * Fungsi helper untuk memecah teks menjadi kata-kata
 * dan membungkusnya dalam <span> untuk animasi.
 */
const splitTextIntoWords = (element: HTMLElement) => {
  if (!element.textContent) return [];
  const words = element.textContent.split(/\s+/).filter(Boolean);
  element.innerHTML = '';

  return words.map(word => {
    const wordMask = document.createElement('span');
    wordMask.className = 'word-mask';

    const wordContent = document.createElement('span');
    wordContent.className = 'word-content';
    wordContent.textContent = word;

    wordMask.appendChild(wordContent);
    element.appendChild(wordMask);
    element.appendChild(document.createTextNode(' '));

    return wordContent;
  });
};

// Animasi GABUNGAN (Word reveal + Card slide)
const setupAboutAnimation = async () => {
  if (!isClient || !aboutSection.value) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const section = aboutSection.value

  // Ambil elemen dari refs
  const title = titleRef.value
  const p1 = p1Ref.value
  const p2 = p2Ref.value
  const profileCardContainer = cardRef.value

  if (!title || !p1 || !p2 || !profileCardContainer) {
    console.warn('Elemen animasi "About" tidak ditemukan.')
    return
  }

  // --- Memecah teks menjadi kata-kata ---
  const titleWords = splitTextIntoWords(title);
  const p1Words = splitTextIntoWords(p1);
  const p2Words = splitTextIntoWords(p2);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });

  // 1. Animasi Judul (per-kata)
  tl.from(titleWords, {
    yPercent: 110,
    opacity: 0,
    duration: 1.0,
    ease: "power3.out",
    stagger: 0.05
  });

  // 2. Animasi Paragraf 1 (per-kata)
  tl.from(p1Words, {
    yPercent: 110,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.02
  }, "-=0.7");

  // 3. Animasi Paragraf 2 (per-kata)
  tl.from(p2Words, {
    yPercent: 110,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.02
  }, "-=0.5");

  // 4. Animasi Kartu Profil (Geser dari kanan + Fade in)
  tl.from(profileCardContainer, {
    opacity: 0,
    x: 100,
    duration: 1.2,
    ease: "power3.out"
  }, "-=0.5");
}

onMounted(() => {
  if (isClient) {
    setupAboutAnimation()
  }
})
</script>

<style scoped>
.text-gray-700 {
  transition: color 0.5s ease-in-out;
}

/* Optimasi performa */
section {
  transform: translateZ(0);
  backface-visibility: hidden;
}

:global(.word-mask) {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

:global(.word-content) {
  display: block;
}
</style>