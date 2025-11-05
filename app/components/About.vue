<template>
  <section id="about" class="h-screen flex items-center justify-center p-4">

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
          contact-text="Contact Me" avatar-url="/assets/me.jpg" :show-user-info="true" :show-behind-gradient="true"
          :enable-tilt="true" @contact-click="handleContactClick" />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const handleContactClick = () => {
  console.log('Contact button clicked!');
};
</script>