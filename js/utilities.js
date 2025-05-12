'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

/**
 * Demande à l'utilisateur de saisir un entier compris entre min et max.
 * La saisie est répétée tant que l'utilisateur ne fournit pas un entier valide.
 *
 * @param {string} message - Message affiché à l'utilisateur.
 * @param {number} min - Valeur minimale autorisée.
 * @param {number} max - Valeur maximale autorisée.
 * @returns {number} - L'entier saisi par l'utilisateur.
 */
function GetLavel(message, min, max) {
    let choix;

    /*
     * La boucle s'exécute tant que l'entier n'est pas un nombre (fonction isNaN()) et
     * n'est pas compris entre les arguments min et max -> [min,max].
     */
    do {
        // On demande à l'utilisateur de saisir un nombre entier.
        choix = parseInt(window.prompt(message));
    } while (isNaN(choix) || choix < min || choix > max);

    // Retourne l'entier saisi par l'utilisateur.
    return choix;
}

/**
 * Génère un nombre entier aléatoire compris entre min et max inclus.
 *
 * @param {number} min - Valeur minimale possible.
 * @param {number} max - Valeur maximale possible.
 * @returns {number} - Nombre entier aléatoire généré.
 */
function GetDes(min, max) {
    // Calcul d'un nombre entier aléatoire dans l'intervalle [min, max].
    const D = Math.floor(Math.random() * (max - min + 1)) + min;

    // Retourne le résultat du tirage.
    return D;
}
