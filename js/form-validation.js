// js/form-validation.js - Validation des formulaires

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la validation pour tous les formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        initFormValidation(form);
    });
});

// Initialisation de la validation d'un formulaire
function initFormValidation(form) {
    if (!form) return;
    
    // Ajouter des événements pour la validation en temps réel
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Validation au changement de champ
        input.addEventListener('blur', function() {
            validateInput(input);
        });
        
        // Validation à la frappe (avec délai)
        input.addEventListener('input', debounce(function() {
            validateInput(input);
        }, 500));
    });
    
    // Validation à la soumission du formulaire
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            
            // Faire défiler jusqu'au premier champ invalide
            const firstInvalid = form.querySelector('.input-error');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        } else {
            // Si le formulaire est valide, vous pouvez ajouter ici un traitement spécifique
            // Par exemple, soumettre les données via AJAX au lieu d'un rechargement de page
            
            if (form.hasAttribute('data-ajax')) {
                e.preventDefault();
                submitFormAjax(form);
            }
        }
    });
}

// Validation d'un champ spécifique
function validateInput(input) {
    const parentElement = input.parentElement;
    let isValid = true;
    let errorMessage = '';
    
    // Réinitialiser l'état du champ
    parentElement.classList.remove('input-error');
    const existingError = parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Vérifier si le champ est requis
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire';
    }
    
    // Validation par type de champ
    if (isValid && input.value.trim()) {
        const type = input.type;
        const pattern = input.getAttribute('pattern');
        
        if (type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer une adresse email valide';
        } else if (pattern && !new RegExp(pattern).test(input.value)) {
            isValid = false;
            errorMessage = input.getAttribute('data-pattern-message') || 'Format invalide';
        } else if (type === 'tel' && !validatePhone(input.value)) {
            isValid = false;
            errorMessage = 'Veuillez entrer un numéro de téléphone valide';
        }
        
        // Validation personnalisée par attribut data-validate
        const validateType = input.getAttribute('data-validate');
        if (validateType) {
            if (validateType === 'password' && !validatePassword(input.value)) {
                isValid = false;
                errorMessage = 'Le mot de passe doit contenir au moins 8 caractères dont une lettre et un chiffre';
            }
        }
        
        // Validation de la confirmation de mot de passe
        if (input.getAttribute('data-match')) {
            const matchSelector = input.getAttribute('data-match');
            const matchElement = document.querySelector(matchSelector);
            
            if (matchElement && input.value !== matchElement.value) {
                isValid = false;
                errorMessage = 'Les deux valeurs ne correspondent pas';
            }
        }
    }
    
    // Afficher le message d'erreur si nécessaire
    if (!isValid) {
        parentElement.classList.add('input-error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        
        parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Validation d'email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validation de téléphone (format international)
function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Validation de mot de passe
function validatePassword(password) {
    // Au moins 8 caractères, une lettre et un chiffre
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password));
}

// Fonction debounce pour limiter les appels répétés
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Soumission de formulaire via AJAX
function submitFormAjax(form) {
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...';
    }
    
    // Créer un objet FormData pour récupérer tous les champs
    const formData = new FormData(form);
    
    // Simuler une requête AJAX
    setTimeout(() => {
        // Dans un cas réel, remplacez ce setTimeout par un fetch() ou XMLHttpRequest
        
        // Afficher un message de succès
        form.innerHTML = '<div class="success-message">Merci ! Votre demande a été envoyée avec succès.</div>';
        
        // Réinitialiser le formulaire après un certain délai
        setTimeout(() => {
            form.reset();
            form.innerHTML = form.dataset.originalHtml || '';
        }, 5000);
        
    }, 1500); // Simulation d'une requête réseau de 1,5 seconde
}

// Sauvegarder le HTML original des formulaires AJAX
document.addEventListener('DOMContentLoaded', function() {
    const ajaxForms = document.querySelectorAll('form[data-ajax]');
    ajaxForms.forEach(form => {
        form.dataset.originalHtml = form.innerHTML;
    });
});