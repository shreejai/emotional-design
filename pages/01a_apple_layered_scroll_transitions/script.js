import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple layering formula — one timeline, scroll-scrubbed:
 * ~0ms background → ~100ms headline → ~300ms hero → ~600ms details
 */
const tl = gsap.timeline({
  defaults: { ease: 'none' },
});

tl.addLabel('background', 0);
tl.addLabel('headline', 0.1);
tl.addLabel('hero', 0.3);
tl.addLabel('details', 0.6);

// Layer 1 — background mood (scrubbed with scroll)
tl.fromTo(
  '.background',
  { backgroundPosition: '0% 50%' },
  { backgroundPosition: '100% 50%', duration: 0.35 },
  'background',
);
tl.fromTo(
  '.background-mood',
  { opacity: 0.2, scale: 1.12 },
  { opacity: 0.55, scale: 1, ease: 'sine.inOut', duration: 0.35 },
  'background',
)

// Layer 2 — headline (slower ease; scroll still drives time via scrub)
.fromTo(
  '.headline',
  { autoAlpha: 0, y: 56 },
  { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.28 },
  'headline',
);

// Layer 3 — hero
tl.fromTo(
  '.hero .card',
  { autoAlpha: 0, scale: 0.82, z: 72, rotation: -5 },
  { autoAlpha: 1, scale: 1, z: 0, rotation: 0, ease: 'power3.out', duration: 1.22 },
  'hero',
)

// Layer 4 — details
.fromTo(
  '.details li',
  { autoAlpha: 0, y: 40 },
  { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3, stagger: 0.5 },
  'details',
  '>'
);

ScrollTrigger.create({
  trigger: '.background',
  start: 'top top',
  end: '+=280%',
  pin: true,
  scrub: true,
  anticipatePin: 1,
  animation: tl,
});
