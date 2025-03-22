// js/main.js - Script principal pour la landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants et événements
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initPricingToggle();
});

// Gestion de la navigation responsive
function initNavbar() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar-nav');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Fermeture du menu au clic sur un lien
        const navLinks = document.querySelectorAll('.navbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Défilement fluide vers les sections
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajustement pour la navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations au défilement
function initAnimations() {
    // Animation des éléments au scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Toggle pour le switch mensuel/annuel des prix
function initPricingToggle() {
    const pricingToggle = document.querySelector('.pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'block';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'block' : 'none';
            });
        });
    }
}

// Validation du formulaire d'inscription
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Afficher un message de succès
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Merci pour votre inscription !';
                
                form.innerHTML = '';
                form.appendChild(successMessage);
                
                // Vous pouvez également ajouter ici le code pour envoyer les données à un serveur
                console.log('Formulaire soumis avec succès');
            }
        });
    }
}