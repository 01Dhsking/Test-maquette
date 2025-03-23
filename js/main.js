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
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.main-nav-mobile');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });
        
        // Ferme le menu au clic sur un lien
        const navLinks = document.querySelectorAll('.nav-links-mobile a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
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