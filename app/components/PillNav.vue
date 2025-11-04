<script setup lang="ts">
import { gsap } from 'gsap';
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { useColorMode } from '#imports';

// Deklarasi untuk TypeScript
declare global {
  interface Window {
    animateThemeTransition?: (x: number, y: number, onComplete: () => void) => void;
  }
}

type PillNavItem = {
  label: string;
  href?: string;
  ariaLabel?: string;
};

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const props = withDefaults(defineProps<PillNavProps>(), {
  logoAlt: 'Logo',
  className: '',
  ease: 'power3.easeOut',
  baseColor: '#fff',
  pillColor: '#060010',
  hoveredPillTextColor: '#060010',
  pillTextColor: '#fff',
  initialLoadAnimation: true
});

const isMobileMenuOpen = ref(false);
const circleRefs = ref<Array<HTMLSpanElement | null>>([]);
const tlRefs = ref<Array<gsap.core.Timeline | null>>([]);
const activeTweenRefs = ref<Array<gsap.core.Tween | null>>([]);
const logoImgRef = ref<HTMLElement | null>(null);
const logoTweenRef = ref<gsap.core.Tween | null>(null);
const hamburgerRef = ref<HTMLElement | null>(null);
const mobileMenuRef = ref<HTMLElement | null>(null);
const navItemsRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const themeToggleRef = ref<HTMLElement | null>(null);
const themeToggleTween = ref<gsap.core.Tween | null>(null);
const colorMode = useColorMode();

watch(
  () => props.items,
  items => {
    circleRefs.value = new Array(items.length).fill(null);
    tlRefs.value = new Array(items.length).fill(null);
    activeTweenRefs.value = new Array(items.length).fill(null);
  },
  { immediate: true }
);

const layout = () => {
  circleRefs.value.forEach(circle => {
    if (!circle?.parentElement) return;

    const pill = circle.parentElement as HTMLElement;
    const rect = pill.getBoundingClientRect();
    const { width: w, height: h } = rect;
    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`
    });

    const label = pill.querySelector<HTMLElement>('.pill-label');
    const white = pill.querySelector<HTMLElement>('.pill-label-hover');

    if (label) gsap.set(label, { y: 0 });
    if (white) gsap.set(white, { y: h + 12, opacity: 0 });

    const index = circleRefs.value.indexOf(circle);
    if (index === -1) return;

    tlRefs.value[index]?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: props.ease, overwrite: 'auto' }, 0);

    if (label) {
      tl.to(label, { y: -(h + 8), duration: 2, ease: props.ease, overwrite: 'auto' }, 0);
    }

    if (white) {
      gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(white, { y: 0, opacity: 1, duration: 2, ease: props.ease, overwrite: 'auto' }, 0);
    }

    tlRefs.value[index] = tl;
  });
};

const onResize = () => layout();

onMounted(() => {
  layout();

  window.addEventListener('resize', onResize);

  if (document.fonts) {
    document.fonts.ready.then(layout).catch(() => { });
  }

  const menu = mobileMenuRef.value;
  if (menu) {
    gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
  }

  if (props.initialLoadAnimation) {
    const logo = logoRef.value;
    const navItems = navItemsRef.value;

    if (logo) {
      gsap.set(logo, { scale: 0 });
      gsap.to(logo, {
        scale: 1,
        duration: 0.6,
        ease: props.ease
      });
    }

    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, {
        width: 'auto',
        duration: 0.6,
        ease: props.ease
      });
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

watch(
  () => [
    props.items,
    props.ease,
    props.initialLoadAnimation,
    props.baseColor,
    props.pillColor,
    props.hoveredPillTextColor,
    props.pillTextColor
  ],
  async () => {
    await nextTick();
    layout();
  },
  { deep: true }
);

const handleEnter = (i: number) => {
  const tl = tlRefs.value[i];
  if (!tl) return;
  activeTweenRefs.value[i]?.kill();
  activeTweenRefs.value[i] = tl.tweenTo(tl.duration(), {
    duration: 0.3,
    ease: props.ease,
    overwrite: 'auto'
  });
};

const handleLeave = (i: number) => {
  const tl = tlRefs.value[i];
  if (!tl) return;
  activeTweenRefs.value[i]?.kill();
  activeTweenRefs.value[i] = tl.tweenTo(0, {
    duration: 0.2,
    ease: props.ease,
    overwrite: 'auto'
  });
};

const handleLogoEnter = () => {
  const img = logoImgRef.value;
  if (!img) return;
  logoTweenRef.value?.kill();
  gsap.set(img, { rotate: 0 });
  logoTweenRef.value = gsap.to(img, {
    rotate: 360,
    duration: 0.2,
    ease: props.ease,
    overwrite: 'auto'
  });
};

const toggleMobileMenu = () => {
  const newState = !isMobileMenuOpen.value;
  isMobileMenuOpen.value = newState;

  const hamburger = hamburgerRef.value;
  const menu = mobileMenuRef.value;

  if (hamburger) {
    const lines = hamburger.querySelectorAll('.hamburger-line');
    if (newState) {
      if (lines[0]) gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: props.ease });
    } else {
      if (lines[0]) gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: props.ease });
    }
  }

  if (menu) {
    if (newState) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: 10, scaleY: 1 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.3,
          ease: props.ease,
          transformOrigin: 'top center'
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: 10,
        scaleY: 1,
        duration: 0.2,
        ease: props.ease,
        transformOrigin: 'top center',
        onComplete: () => {
          gsap.set(menu, { visibility: 'hidden' });
        }
      });
    }
  }

  props.onMobileMenuClick?.();
};

const isExternalLink = (href: string) =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('//') ||
  href.startsWith('mailto:') ||
  href.startsWith('tel:') ||
  href.startsWith('#');

const isRouterLink = (href?: string) => href && !isExternalLink(href);

const cssVars = computed(() => ({
  '--base': props.baseColor,
  '--pill-bg': props.pillColor,
  '--hover-text': props.hoveredPillTextColor,
  '--pill-text': props.pillTextColor,
  '--nav-h': '42px',
  '--logo': '36px',
  '--pill-pad-x': '18px',
  '--pill-gap': '3px'
}));

const setCircleRef = (el: HTMLSpanElement | null, index: number) => {
  if (circleRefs.value.length > index) {
    circleRefs.value[index] = el;
  }
};

const handleThemeToggleEnter = () => {
  const button = themeToggleRef.value;
  if (!button) return;

  themeToggleTween.value?.kill();

  themeToggleTween.value = gsap.to(button, {
    scale: 1.1,
    rotation: 90,
    duration: 0.4,
    ease: "back.out(1.7)",
    overwrite: 'auto'
  });
};

const handleThemeToggleLeave = () => {
  const button = themeToggleRef.value;
  if (!button) return;

  themeToggleTween.value?.kill();

  themeToggleTween.value = gsap.to(button, {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: "power2.out",
    overwrite: 'auto'
  });
};

const toggleTheme = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;

  if (window.animateThemeTransition) {
    window.animateThemeTransition(x, y, () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    });
  } else {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
}

</script>

<template>
  <div class="top-[1em] left-0 z-[1000] fixed w-full md:w-auto md:left-1/2 md:-translate-x-1/2">
    <nav
      :class="['w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0', className]"
      aria-label="Primary" :style="cssVars">
      <component v-if="logo" :is="isRouterLink(items?.[0]?.href) ? 'RouterLink' : 'a'"
        :to="isRouterLink(items?.[0]?.href) ? items[0]?.href : undefined"
        :href="!isRouterLink(items?.[0]?.href) ? items?.[0]?.href || '#' : undefined" aria-label="Home" role="menuitem"
        ref="logoRef" class="inline-flex justify-center items-center p-2 rounded-full overflow-hidden" :style="{
          width: 'var(--nav-h)',
          height: 'var(--nav-h)',
          background: 'var(--base, #000)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)'
        }" @mouseenter="handleLogoEnter">
        <img :src="logo" :alt="logoAlt" ref="logoImgRef" class="block w-full h-full object-cover" />
      </component>

      <div ref="navItemsRef" class="hidden relative md:flex items-center ml-2 rounded-full" :style="{
        height: 'var(--nav-h)',
        background: 'var(--base, #000)',
        'backdrop-filter': 'blur(10px)',
        '-webkit-backdrop-filter': 'blur(10px)'
      }">
        <ul role="menubar" class="flex items-stretch m-0 p-[3px] h-full list-none" :style="{ gap: 'var(--pill-gap)' }">
          <li v-for="(item, i) in items" :key="item.href || `item-${i}`" class="flex h-full" role="none">
            <component :is="isRouterLink(item.href) ? 'RouterLink' : 'a'"
              :to="isRouterLink(item.href) ? item.href : undefined"
              :href="!isRouterLink(item.href) ? item.href : undefined"
              class="inline-flex box-border relative justify-center items-center px-0 rounded-full h-full overflow-hidden font-semibold text-[16px] no-underline uppercase leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer"
              :style="{
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              }" :aria-label="item.ariaLabel || item.label" @mouseenter="handleEnter(i)" @mouseleave="handleLeave(i)">
              <span class="block bottom-0 left-1/2 z-[1] absolute rounded-full pointer-events-none hover-circle" :style="{
                background: 'var(--base, #000)',
                willChange: 'transform'
              }" aria-hidden="true" :ref="el => setCircleRef(el as HTMLSpanElement, i)" />
              <span class="inline-block z-[2] relative leading-[1] label-stack">
                <span class="inline-block z-[2] relative leading-[1] pill-label" :style="{ willChange: 'transform' }">
                  {{ item.label }}
                </span>
                <span class="inline-block top-0 left-0 z-[3] absolute pill-label-hover" :style="{
                  color: 'var(--hover-text, #fff)',
                  willChange: 'transform, opacity'
                }" aria-hidden="true">
                  {{ item.label }}
                </span>
              </span>
              <span v-if="activeHref === item.href"
                class="-bottom-[6px] left-1/2 z-[4] absolute rounded-full w-3 h-3 -translate-x-1/2"
                :style="{ background: 'var(--base, #000)' }" aria-hidden="true" />
            </component>
          </li>
        </ul>
        <button ref="themeToggleRef" @click="toggleTheme($event)" @mouseenter="handleThemeToggleEnter"
          @mouseleave="handleThemeToggleLeave" aria-label="Ganti Tema" class="theme-toggle-button"
          :style="{ background: 'var(--pill-bg)', color: 'var(--pill-text)' }">
          <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25 2.25 2.25 0 002.25 2.25 2.25 2.25 0 002.25-2.25A2.25 2.25 0 0012 12z" />
          </svg>
        </button>
      </div>

      <button ref="hamburgerRef" @click="toggleMobileMenu" aria-label="Toggle menu" :aria-expanded="isMobileMenuOpen"
        class="md:hidden relative flex flex-col justify-center items-center gap-1 p-0 border-0 rounded-full cursor-pointer"
        :style="{
          width: 'var(--nav-h)',
          height: 'var(--nav-h)',
          background: 'var(--base, #000)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)'
        }">
        <span
          class="rounded w-4 h-0.5 origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hamburger-line"
          :style="{ background: 'var(--pill-bg, #fff)' }" />
        <span
          class="rounded w-4 h-0.5 origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hamburger-line"
          :style="{ background: 'var(--pill-bg, #fff)' }" />
      </button>
    </nav>

    <div ref="mobileMenuRef"
      class="md:hidden top-[3em] right-4 left-4 z-[998] absolute shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[27px] origin-top"
      :style="{
        ...cssVars,
        background: 'var(--base, #f0f0f0)'
      }">
      <ul class="flex flex-col gap-[3px] m-0 p-[3px] list-none">
        <li v-for="item in items" :key="item.href || `mobile-${item.label}`">
          <component :is="isRouterLink(item.href) ? 'RouterLink' : 'a'"
            :to="isRouterLink(item.href) ? item.href : undefined"
            :href="!isRouterLink(item.href) ? item.href : undefined"
            class="block px-4 py-3 rounded-[50px] font-medium text-[16px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            :style="{ background: 'var(--pill-bg, #fff)', color: 'var(--pill-text, #fff)' }" @mouseenter="
              (e: MouseEvent) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--base)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--hover-text, #fff)';
              }
            " @mouseleave="
              (e: MouseEvent) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--pill-bg, #fff)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--pill-text, #fff)';
              }
            ">
            {{ item.label }}
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.theme-toggle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  margin-right: 3px;
  margin-left: 5px;
  cursor: pointer;
  border: none;
  transform-origin: center;
  /* transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); */
}

.theme-toggle-button:hover {
  transform: scale(1.1) rotate(90deg);
}

.theme-toggle-button svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>