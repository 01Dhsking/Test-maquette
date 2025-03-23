document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants et événements
    initNavbar();
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
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');
            });
        });
    }
}