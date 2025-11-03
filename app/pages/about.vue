<template>
  <section id="about" class="h-screen flex items-center justify-center">
    <div>
      <h1 class="text-5xl font-bold">Ini Bagian About</h1>
      <ProfileCard name="Dzaky Rahmat N." title="Software Engineer" handle="dzaky" status="Online"
        contact-text="Contact Me" avatar-url="/assets/me-Photoroom.png" mini-avatar-url="/assets/me-Photoroom.png" :show-user-info="true"
        :show-behind-gradient="true" :enable-tilt="true" @contact-click="handleContactClick" />
    </div>
  </section>
</template>

<script setup lang="ts">

const handleContactClick = () => {
  console.log('Contact button clicked!');
};
</script>