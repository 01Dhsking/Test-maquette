// js/main.js - Script principal pour la landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants et événements
    initNavbar();
});

// Gestion de la navigation responsive
function initNavbar() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            // Ajoute la classe active au bouton pour l'animation
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });
        
        // Ferme le menu au clic sur un lien
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navbar.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            });
        });
    }
}
