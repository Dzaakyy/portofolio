<template>
  <footer class="bg-gray-900 text-white py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">

        <div class="text-gray-400 text-sm order-last md:order-first">
          Dzaky Rahmat Nurwahid &copy; {{ currentYear }}
        </div>

        </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'



const currentYear = ref(new Date().getFullYear())

</script>