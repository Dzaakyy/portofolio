<template>
  <section 
    id="about" 
    class="h-screen flex items-center justify-center p-4"
    ref="aboutSection"
  >
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto">
      
      <div class="md:w-1/2 text-center md:text-left">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">
          About Me
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Halo! Saya Dzaky Rahmat Nurwahid, seorang Software Engineer. Saya memiliki
          ketertarikan mendalam pada pengembangan backend, didorong oleh antusiasme untuk menyelesaikan tantangan
          fullstack. Saya percaya bahwa solusi digital yang luar biasa lahir dari pemahaman menyeluruh yang menjembatani
          antara logika server-side yang kompleks dan pengalaman pengguna front-end yang intuitif.
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Saya memiliki pengalaman dengan berbagai teknologi modern untuk membangun
          aplikasi yang skalabel dan efisien.
        </p>
      </div>

      <div class="md:w-1/2 flex justify-center md:justify-end">
        <ProfileCard  
          handle="dzaky" 
          status="Online"
          contact-text="Contact Me" 
          avatar-url="/assets/me.jpg" 
          :show-user-info="true" 
          :show-behind-gradient="true"
          :enable-tilt="true" 
          @contact-click="handleContactClick" 
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isClient = typeof window !== 'undefined'
const aboutSection = ref<HTMLElement | null>(null)

const handleContactClick = () => {
  console.log('Contact button clicked!');
};

// Animasi yang sangat smooth dan tidak mengganggu
const setupAboutAnimation = async () => {
  if (!isClient || !aboutSection.value) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  
  gsap.registerPlugin(ScrollTrigger)

  // Animasi yang sangat subtle untuk seluruh section
  gsap.fromTo(aboutSection.value,
    { 
      opacity: 0
    },
    { 
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutSection.value,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  )
}

onMounted(() => {
  if (isClient) {
    requestAnimationFrame(() => {
      setTimeout(setupAboutAnimation, 200)
    })
  }
})
</script>

<style scoped>
/* Smooth transition untuk dark mode */
.text-gray-700 {
  transition: color 0.5s ease-in-out;
}

/* Optimasi performa */
section {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>