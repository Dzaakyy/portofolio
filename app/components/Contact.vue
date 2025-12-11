<template>
  <section id="contact"
    class="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden"
    ref="contactSection">

    <div
      class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px] dark:bg-blue-900/20">
    </div>

    <div class="relative max-w-6xl w-full mx-auto z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        <div
          class="flex flex-col justify-center h-full space-y-8 transition-all duration-1000 ease-out translate-y-10 opacity-0"
          ref="contactInfoRef">
          <div>
            <span
              class="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wider uppercase mb-4 border border-gray-200 dark:border-white/10">
              Get in Touch
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              Let's build something <br>
              <span class="text-gray-400 dark:text-gray-600">extraordinary.</span>
            </h2>
          </div>

          <div class="space-y-6 pt-4">
            <div class="group flex items-center space-x-5 transition-all duration-300">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">Email</h3>
                <p class="text-lg font-medium text-gray-900 dark:text-white">dzakynurwahid46@gmail.com</p>
              </div>
            </div>

            <div class="group flex items-center space-x-5 transition-all duration-300">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">Location</h3>
                <p class="text-lg font-medium text-gray-900 dark:text-white">Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative w-full pt-4 lg:pt-0 transition-all duration-1000 ease-out translate-y-10 opacity-0"
          ref="contactFormRef">
          <form ref="formRef" @submit.prevent="sendEmail" class="space-y-6">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="group space-y-2">
                <label
                  class="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Nama</label>
                <input type="text" name="user_name" required placeholder="Nama Kamu"
                  class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all duration-300 dark:text-white placeholder-gray-400">
              </div>

              <div class="group space-y-2">
                <label
                  class="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Email</label>
                <input type="email" name="user_email" required placeholder="email@kamu.com"
                  class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all duration-300 dark:text-white placeholder-gray-400">
              </div>
            </div>

            <div class="group space-y-2">
              <label
                class="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Subjek</label>
              <input type="text" name="subject" required placeholder="Topik diskusi"
                class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all duration-300 dark:text-white placeholder-gray-400">
            </div>

            <div class="group space-y-2">
              <label
                class="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">Pesan</label>
              <textarea name="message" rows="5" required placeholder="Tulis pesanmu di sini..."
                class="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all duration-300 resize-none dark:text-white placeholder-gray-400"></textarea>
            </div>

            <button type="submit" :disabled="isLoading"
              class="w-full py-4 px-8 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-90 transform active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
              <span v-if="isLoading"
                class="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"></span>
              <span>{{ isLoading ? 'Sending...' : 'Send Message' }}</span>
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <Transition enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <div v-if="status.message" :class="[
                'p-4 rounded-xl flex items-center gap-3 text-sm font-medium border',
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                  : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
              ]">
                {{ status.message }}
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

const formRef = ref(null);
const isLoading = ref(false);
const status = ref({ type: '', message: '' });

const contactSection = ref(null);
const contactInfoRef = ref(null);
const contactFormRef = ref(null);
let observer = null;
let hasAnimated = false;

const animateOnLoad = () => {
  if (!contactInfoRef.value || !contactFormRef.value) return;

  setTimeout(() => {
    contactInfoRef.value.style.opacity = '1';
    contactInfoRef.value.style.transform = 'translateY(0)';
  }, 200);

  setTimeout(() => {
    contactFormRef.value.style.opacity = '1';
    contactFormRef.value.style.transform = 'translateY(0)';
  }, 500);
}

const resetAnimation = () => {
  if (!contactInfoRef.value || !contactFormRef.value) return;

  [contactInfoRef.value, contactFormRef.value].forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
  });
}

const setupIntersectionObserver = () => {
  if (!contactSection.value) return;
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasAnimated) {
          animateOnLoad();
          hasAnimated = true;
        }
      } else {
        hasAnimated = false;
        resetAnimation();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(contactSection.value);
};

onMounted(() => {
  nextTick(() => {
    resetAnimation();
    setupIntersectionObserver();
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const sendEmail = async () => {
  if (!formRef.value) return;

  const formData = new FormData(formRef.value);
  const data = Object.fromEntries(formData.entries());

  isLoading.value = true;
  status.value = { type: '', message: '' };

  try {
    const YOUR_EMAIL = "dzakynurwahid46@gmail.com";

    const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.user_name,
        email: data.user_email,
        subject: data.subject,
        message: data.message,
        _template: 'table',
        _captcha: 'false'
      })
    });

    const result = await response.json();

    if (response.ok) {
      status.value = {
        type: 'success',
        message: 'Pesan berhasil dikirim! Cek email kamu untuk konfirmasi pertama kali.'
      };
      formRef.value.reset();
    } else {
      throw new Error('Gagal mengirim');
    }

  } catch (error) {
    console.error('Error:', error);
    status.value = {
      type: 'error',
      message: 'Gagal mengirim pesan. Silakan coba lagi nanti.'
    };
  } finally {
    isLoading.value = false;
    if (status.value.type === 'success') {
      setTimeout(() => {
        status.value = { type: '', message: '' };
      }, 5000);
    }
  }
};
</script>