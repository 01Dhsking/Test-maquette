// js/utils.js - Fonctions utilitaires diverses

/**
 * Détection de l'appareil/navigateur
 */
const Utils = {
    // Détecter si l'utilisateur est sur mobile
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Détecter si l'utilisateur est sur iOS
    isIOS: function() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    },
    
    // Détecter si le mode sombre est activé
    isDarkMode: function() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    
    /**
     * Fonctions de manipulation de cookies
     */
    // Définir un cookie
    setCookie: function(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
    },
    
    // Récupérer un cookie
    getCookie: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    
    // Supprimer un cookie
    eraseCookie: function(name) {
        this.setCookie(name, '', -1);
    },
    
    /**
     * Fonctions de gestion du stockage local
     */
    // Sauvegarder une valeur dans localStorage
    saveToLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Erreur lors de la sauvegarde dans localStorage', e);
            return false;
        }
    },
    
    // Récupérer une valeur depuis localStorage
    getFromLocalStorage: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Erreur lors de la récupération depuis localStorage', e);
            return defaultValue;
        }
    },
    
    /**
     * Fonctions d'URL et de paramètres
     */
    // Récupérer un paramètre d'URL
    getUrlParameter: function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    
    // Générer une chaîne de paramètres d'URL à partir d'un objet
    objectToUrlParams: function(obj) {
        return Object.keys(obj)
            .filter(key => obj[key] !== undefined && obj[key] !== null)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
            .join('&');
    },
    
    /**
     * Fonctions de formatage
     */
    // Formater un prix
    formatPrice: function(price, locale = 'fr-FR', currency = 'EUR') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(price);
    },
    
    // Formater une date
    formatDate: function(date, locale = 'fr-FR') {
        return new Date(date).toLocaleDateString(locale);
    },
    
    /**
     * Autres fonctions utilitaires
     */
    // Générer un ID unique
    generateUniqueId: function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Tronquer un texte à une longueur donnée
    truncateText: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
};

// Exporter l'objet Utils
window.Utils = Utils;