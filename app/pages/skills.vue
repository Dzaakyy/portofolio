<template>
    <section id="skills" class="min-h-screen py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-6xl mx-auto">

            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Keahlian & Teknologi
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Teknologi utama yang saya gunakan untuk mengembangkan aplikasi web dan mobile.
                </p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">

                <div v-for="skill in allSkills" :key="skill.name" class="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                 transition-all duration-300 hover:shadow-2xl 
                 relative group overflow-hidden after:content-[''] after:absolute after:inset-[-2px] after:rounded-xl 
                 after:bg-gradient-to-r after:from-purple-500 after:to-blue-500
                 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500 group-hover:after:animate-spin
                 hover:shadow-purple-500/50 hover:shadow-xl dark:hover:shadow-blue-500/50">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                    </div>

                    <div
                        class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out -z-10 blur-sm">
                    </div>

                    <img :src="skill.iconUrl" :alt="`${skill.name} logo`" class="h-14 w-14 lg:h-16 lg:w-16 mb-3 object-contain relative z-10 
                   grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out
                   group-hover:scale-110" loading="lazy" />
                    <span
                        class="text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 text-center relative z-10">
                        {{ skill.name }}
                    </span>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Skill {
    name: string;
    iconUrl: string;
}

const allSkills = ref<Skill[]>([
    { name: 'Flutter', iconUrl: 'https://unpkg.com/devicon@latest/icons/flutter/flutter-original.svg' },
    { name: 'Vue.js', iconUrl: 'https://unpkg.com/devicon@latest/icons/vuejs/vuejs-original.svg' },
    { name: 'Nuxt.js', iconUrl: 'https://unpkg.com/devicon@latest/icons/nuxtjs/nuxtjs-original.svg' },
    { name: 'Tailwind CSS', iconUrl: 'https://unpkg.com/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'HTML5', iconUrl: 'https://unpkg.com/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', iconUrl: 'https://unpkg.com/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Node.js', iconUrl: 'https://unpkg.com/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Laravel', iconUrl: 'https://unpkg.com/devicon@latest/icons/laravel/laravel-original.svg' },
    { name: 'PHP', iconUrl: 'https://unpkg.com/devicon@latest/icons/php/php-original.svg' },
    { name: 'Sequelize', iconUrl: 'https://unpkg.com/devicon@latest/icons/sequelize/sequelize-original.svg' },
    { name: 'MySQL', iconUrl: 'https://unpkg.com/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },
    { name: 'PostgreSQL', iconUrl: 'https://unpkg.com/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Git', iconUrl: 'https://unpkg.com/devicon@latest/icons/git/git-original.svg' },
    { name: 'Postman', iconUrl: 'https://unpkg.com/devicon@latest/icons/postman/postman-original.svg' },
]);
</script>