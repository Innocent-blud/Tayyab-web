// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor — only on devices with a real pointer (desktop/laptop)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia('(pointer: fine)').matches) {
    // Desktop: show cursor and track mouse
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
} else {
    // Mobile/touch: hide the cursor elements entirely
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}

// Hero Animation
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.hero-background-text span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3
    })
    .from('.hero-character', {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.8')
    .from('.hero-description', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

// Character & Text Parallax (desktop only — on mobile the layout stacks vertically)
if (window.matchMedia('(min-width: 769px)').matches) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        gsap.to('.hero-character', {
            x: moveX,
            y: moveY,
            xPercent: -50,
            yPercent: -50,
            duration: 0.5,
            ease: 'power1.out'
        });

        gsap.to('.hero-background-text', {
            x: -moveX * 0.3,
            y: -moveY * 0.3,
            xPercent: -50,
            yPercent: -50,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
}

// Marquee hover is handled by CSS transitions (smooth 0.5s ease)

// Set initial hidden state for About section elements
gsap.set('.section-title', { y: 100, opacity: 0 });
gsap.set('.about-content p', { y: 50, opacity: 0 });
gsap.set('.about .hero-cta', { y: 50, opacity: 0, scale: 0.9 });
gsap.set('.about-shape', { scale: 0.5, opacity: 0 });

// About Section Scroll Animations
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top 60%',
        end: 'bottom top',
        toggleActions: 'play none none reverse'
    }
});

aboutTimeline
    .to('.section-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.about-content p', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.about .hero-cta', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4')
    .to('.about-shape', {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.8');

// Services Section Animations
gsap.set('.services-container', { y: 100, opacity: 0 });
gsap.set('.service-item', { x: -50, opacity: 0 });

const servicesTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.services',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

servicesTimeline
    .to('.services-container', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.service-item', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.5');
