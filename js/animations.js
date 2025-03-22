// js/animations.js - Animations spécifiques pour la landing page

// Animation des compteurs pour les statistiques
function initCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // durée en ms
        const step = Math.ceil(target / (duration / 16)); // ~60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current > target) {
                current = target;
                clearInterval(interval);
            }
            
            counter.textContent = formatNumber(current);
        };
        
        const interval = setInterval(updateCounter, 16);
    });
}

// Formatage des nombres avec séparateur de milliers
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}

// Animation de la section dashboard (graphiques)
function animateDashboard() {
    const charts = document.querySelectorAll('.chart-bar');
    
    charts.forEach((chart, index) => {
        setTimeout(() => {
            const height = chart.getAttribute('data-height');
            chart.style.height = height;
        }, index * 100);
    });
}

// Animation des témoignages
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;
    
    // Créer les points de navigation
    if (testimonials.length > 1 && dotsContainer) {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    // Afficher un témoignage spécifique
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Auto-rotation des témoignages
    if (testimonials.length > 1) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
}

// Animation des éléments au scroll
function fadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Initialisation de toutes les animations
document.addEventListener('DOMContentLoaded', function() {
    // Délai pour laisser la page se charger complètement
    setTimeout(() => {
        fadeInElements();
        initCounters();
        animateDashboard();
        initTestimonialSlider();
    }, 100);
    
    // Réinitialisation des animations au redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        animateDashboard();
    });
});