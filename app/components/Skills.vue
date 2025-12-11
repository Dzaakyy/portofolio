<template>
    <section id="skills" class="relative py-20 md:py-28 px-4 bg-white dark:bg-black overflow-hidden"
        ref="skillsSection">


        <div class="max-w-6xl mx-auto relative z-10">

            <div class="text-center mb-16 md:mb-24 transition-all duration-500 ease-out" ref="headerRef">
                <span
                    class="inline-block py-1 px-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wider uppercase mb-4 border border-gray-200 dark:border-white/10">
                    Tech Stack
                </span>
                <h2 class="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
                    Technical <span class="text-gray-400 dark:text-gray-600">Stack.</span>
                </h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8"
                ref="gridRef">

                <div v-for="(skill, index) in allSkills" :key="skill.name" class="group relative flex flex-col items-center justify-center p-6 rounded-2xl 
                   bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-sm
                   border border-gray-200 dark:border-white/10
                   transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
                   hover:-translate-y-2 
                   hover:shadow-[0_0_1.5rem_0.1rem_rgba(168,85,247,0.4)]
                   dark:hover:shadow-[0_8px_30px_-5px_rgba(59,130,246,0.5)]
                   hover:border-purple-500/50 
                   dark:hover:border-blue-400/50" :style="{ transitionDelay: `${index * 50}ms` }">

                    <div
                        class="relative h-16 w-16 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <img :src="skill.iconUrl" :alt="`${skill.name} logo`" class="w-full h-full object-contain filter grayscale opacity-70 
                     group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" loading="lazy" />
                    </div>

                    <span class="text-sm font-bold text-gray-600 dark:text-gray-400 
                   group-hover:text-purple-600 dark:group-hover:text-blue-400 
                   transition-colors duration-300">
                        {{ skill.name }}
                    </span>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue';

const skillsSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

let hasAnimated = false;
let observer: IntersectionObserver | null = null;

interface Skill {
    name: string;
    iconUrl: string;
}

const allSkills = ref<Skill[]>([
    { name: 'Flutter', iconUrl: 'https://unpkg.com/devicon@latest/icons/flutter/flutter-original.svg' },
    { name: 'Vue.js', iconUrl: 'https://unpkg.com/devicon@latest/icons/vuejs/vuejs-original.svg' },
    { name: 'Nuxt.js', iconUrl: 'https://unpkg.com/devicon@latest/icons/nuxtjs/nuxtjs-original.svg' },
    { name: 'Tailwind', iconUrl: 'https://unpkg.com/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
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

const initializeAnimationState = () => {
    if (!headerRef.value || !gridRef.value) return;

    const header = headerRef.value;
    const cards = gridRef.value.children;

    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';

    Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
    });
};

const animateOnLoad = () => {
    if (!headerRef.value || !gridRef.value) return;

    const header = headerRef.value;
    const cards = gridRef.value.children;

    header.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';

    setTimeout(() => {
        Array.from(cards).forEach((card, index) => {
            setTimeout(() => {
                const el = card as HTMLElement;
                el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 200);
};

const resetAnimation = () => {
    if (!headerRef.value || !gridRef.value) return;
    const header = headerRef.value;
    const cards = gridRef.value.children;

    header.style.transition = 'none';
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';

    Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
    });
};

const setupIntersectionObserver = () => {
    if (!skillsSection.value) return;

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
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(skillsSection.value);
};

onMounted(() => {
    nextTick(() => {
        initializeAnimationState();
        setupIntersectionObserver();
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});
</script>