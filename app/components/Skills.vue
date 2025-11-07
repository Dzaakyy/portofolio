<template>
    <section id="skills" class="min-h-screen py-20 md:py-28 px-4" ref="skillsSection">
        <div class="max-w-6xl mx-auto">

            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white" ref="titleRef">
                    Keahlian & Teknologi
                </h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8" ref="gridRef">

                <div v-for="skill in allSkills" :key="skill.name" 
                    class="skill-item flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                    transition-all duration-300 hover:shadow-2xl 
                    relative group overflow-hidden after:content-[''] after:absolute after:inset-[-2px] after:rounded-xl 
                    after:bg-gradient-to-r after:from-purple-500 after:to-blue-500
                    after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500 group-hover:after:animate-spin
                    hover:shadow-purple-500/50 hover:shadow-xl dark:hover:shadow-blue-500/50
                    will-change-transform"> 
                    
                    <img :src="skill.iconUrl" :alt="`${skill.name} logo`" 
                        class="h-14 w-14 lg:h-16 lg:w-16 mb-3 object-contain relative z-10 
                        grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out
                        group-hover:scale-110
                        will-change-filter" 
                        loading="lazy" />
                    
                    <span class="text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 text-center relative z-10">
                        {{ skill.name }}
                    </span>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const skillsSection = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
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

const initializeAnimationState = () => {
    if (!titleRef.value || !gridRef.value) return;

    const title = titleRef.value;
    const skillItems = gridRef.value.querySelectorAll('.skill-item');

    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    skillItems.forEach((item) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px) scale(0.9)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
};

const animateOnLoad = () => {
    if (!titleRef.value || !gridRef.value) return;

    const title = titleRef.value;
    const skillItems = gridRef.value.querySelectorAll('.skill-item');

    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';

        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const element = item as HTMLElement;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, index * 60);
        });
    }, 100);
};

const setupIntersectionObserver = () => {
    if (!skillsSection.value) return;

    if (observer) {
        observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                animateOnLoad();
                hasAnimated = true;
            } else if (!entry.isIntersecting) {
                hasAnimated = false;
                
                if (titleRef.value && gridRef.value) {
                    const title = titleRef.value;
                    const skillItems = gridRef.value.querySelectorAll('.skill-item');
                    
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(30px)';
                    
                    skillItems.forEach((item) => {
                        const element = item as HTMLElement;
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(40px) scale(0.9)';
                    });
                }
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
        
        setTimeout(() => {
            if (skillsSection.value && !hasAnimated) {
                const rect = skillsSection.value.getBoundingClientRect();
                const isVisible = (
                    rect.top < window.innerHeight * 0.8 && 
                    rect.bottom > window.innerHeight * 0.2
                );
                
                if (isVisible) {
                    animateOnLoad();
                    hasAnimated = true;
                }
            }
        }, 300);
    });
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>