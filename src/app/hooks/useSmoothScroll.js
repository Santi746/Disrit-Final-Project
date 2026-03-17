"use client";

import { useCallback } from 'react';

/**
 * Hook personalizado para manejar el scroll suave hacia elementos específicos del DOM.
 * @returns {Object} Un objeto que contiene la función scrollToSection.
 * @property {Function} scrollToSection - Función que recibe el ID de un elemento y hace scroll hacia él.
 */
export const useSmoothScroll = () => {
    
    /**
     * Hace scroll suave hacia el elemento con el ID proporcionado.
     * @param {string} sectionId - El atributo 'id' del elemento HTML destino (ej. "category-1").
     * @param {number} [offset=90] - Margen superior opcional (en px) para que el elemento no quede pegado arriba.
     */
    const scrollToSection = useCallback((sectionId, offset = 90) => {
        const element = document.getElementById(sectionId);
        
        if (element) {
            // Calculamos la posición del elemento relativa al documento, restando el offset (ej. espacio para el header/chips)
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else {
            console.warn(`useSmoothScroll: No se encontró el elemento con el id "${sectionId}"`);
        }
    }, []);

    return { scrollToSection };
};
