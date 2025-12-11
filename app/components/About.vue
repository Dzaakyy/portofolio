<template>
    <section id="about" class="h-screen flex items-center justify-center p-4" ref="aboutSection">
        <div class="relative w-full max-w-6xl">

            <div class="flex flex-col md:flex-row items-center justify-center w-full 
             bg-white dark:bg-[#060010] 
             rounded-2xl shadow-xl p-8 md:p-12 
             [box-shadow:0_0_1.5rem_0.1rem_rgba(168,85,247,0.4)] 
             dark:[box-shadow:0_0_1.5rem_0.1rem_rgba(59,130,246,0.4)]">
                <div class="md:w-1/2">
                    <div class="text-center md:text-left">
                        <h1 ref="titleRef" class="text-4xl lg:text-5xl font-bold mb-4">
                            About Me
                        </h1>
                        <p ref="p1Ref" class="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            Halo! Saya Dzaky Rahmat Nurwahid, seorang Software Engineer. Saya memiliki ketertarikan mendalam pada pengembangan backend, didorong oleh antusiasme untuk
                            menyelesaikan tantangan
                            fullstack. Saya percaya bahwa solusi digital yang luar biasa lahir dari pemahaman menyeluruh
                            yang menjembatani
                            antara logika server-side yang kompleks dan pengalaman pengguna front-end yang intuitif.

                        </p>
                        <p ref="p2Ref" class="text-lg text-gray-700 dark:text-gray-300">
                            Saya memiliki pengalaman dengan berbagai teknologi modern untuk membangun
                            aplikasi yang skalabel dan efisien.
                        </p>
                    </div>
                </div>

                <div class="md:w-1/2 w-full h-[450px] md:pl-8 mt-8 md:mt-0 
              [--overlay-blur-color:white] dark:[--overlay-blur-color:#060010]">
           <DomeGallery :images="[
             '/assets/me.jpg',
             '/assets/me2.jpg',
             '/assets/me3.jpg',
             '/assets/me4.jpg',
             '/assets/me5.jpg',
             '/assets/me6.jpg',
             '/assets/me7.jpg',
             '/assets/me8.jpg',
             '/assets/me9.jpg',
             '/assets/me10.jpg',
             '/assets/me11.jpg',
             '/assets/me12.jpg',
             '/assets/me13.jpg',
             '/assets/me14.jpg',
           ]" :fit="0.8" fit-basis="auto" :min-radius="600" :segments="34" :drag-sensitivity="20"
             :enlarge-transition-ms="300" :grayscale="true" 
             image-border-radius="30px" opened-image-width="250px" opened-image-height="350px" />
         </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const isClient = typeof window !== "undefined";
const aboutSection = ref<HTMLElement | null>(null);

const titleRef = ref<HTMLElement | null>(null);
const p1Ref = ref<HTMLElement | null>(null);
const p2Ref = ref<HTMLElement | null>(null);

const splitTextIntoWords = (element: HTMLElement) => {
    if (!element.textContent) return [];
    const words = element.textContent.split(/\s+/).filter(Boolean);
    element.innerHTML = "";

    return words.map((word) => {
        const wordMask = document.createElement("span");
        wordMask.className = "word-mask";

        const wordContent = document.createElement("span");
        wordContent.className = "word-content";
        wordContent.textContent = word;

        wordMask.appendChild(wordContent);
        element.appendChild(wordMask);
        element.appendChild(document.createTextNode(" "));

        return wordContent;
    });
};

const setupAboutAnimation = async () => {
    if (!isClient || !aboutSection.value) return;

    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const section = aboutSection.value;

    const title = titleRef.value;
    const p1 = p1Ref.value;
    const p2 = p2Ref.value;

    if (!title || !p1 || !p2) {
        console.warn('Elemen animasi "About" tidak ditemukan.');
        return;
    }

    const titleWords = splitTextIntoWords(title);
    const p1Words = splitTextIntoWords(p1);
    const p2Words = splitTextIntoWords(p2);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
        },
    });

    tl.from(titleWords, {
        yPercent: 110,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.05,
    });

    tl.from(
        p1Words,
        {
            yPercent: 110,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.02,
        },
        "-=0.7",
    );

    tl.from(
        p2Words,
        {
            yPercent: 110,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.02,
        },
        "-=0.5",
    );
};

onMounted(() => {
    if (isClient) {
        setupAboutAnimation();
    }
});
</script>

<style scoped>
.text-gray-700 {
    transition: color 0.5s ease-in-out;
}

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