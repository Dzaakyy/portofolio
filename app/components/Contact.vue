<template>
  <section id="contact" class="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
          Hubungi Saya
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Silakan hubungi saya melalui form di bawah ini untuk diskusi lebih lanjut
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="nama" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Nama Lengkap
              </label>
              <input 
                type="text" 
                id="nama" 
                v-model="form.nama"
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                placeholder="anda@email.com"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
            </div>
          </div>

          <div>
            <label for="subjek" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Subjek
            </label>
            <input 
              type="text" 
              id="subjek" 
              v-model="form.subjek"
              placeholder="Subjek pesan Anda"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
          </div>

          <div>
            <label for="pesan" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Pesan
            </label>
            <textarea 
              id="pesan" 
              rows="5" 
              v-model="form.pesan"
              placeholder="Tulis pesan Anda di sini..."
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            ></textarea>
          </div>

          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting">Kirim Pesan</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim...
            </span>
          </button>
        </form>

        <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div class="flex items-center text-green-800 dark:text-green-200">
            <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nama: '',
  email: '',
  subjek: '',
  pesan: ''
})

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const submitForm = () => {
  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    showSuccessMessage.value = true
    
    // Reset form
    form.value = {
      nama: '',
      email: '',
      subjek: '',
      pesan: ''
    }
    
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }, 1500)
}
</script>