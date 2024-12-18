// Actividades Section Animations

// Show Activities Section with cool animations when the page is loaded
window.addEventListener('load', () => {
    gsap.from(".activity-card", { opacity: 0, y: 100, duration: 1, stagger: 0.2 });
});

// Tilt Effect for Cards
VanillaTilt.init(document.querySelectorAll(".activity-card"), {
    max: 15,
    speed: 400
});
