"use client";

import { useState, useEffect } from "react";

/**
 * @typedef {Object} Breakpoint
 * @property {number} maxWidth - Ancho máximo de pantalla en px para activar este valor.
 * @property {*} value - Valor a retornar cuando el ancho es <= maxWidth.
 */

/**
 * Hook que retorna un valor reactivo según el ancho actual de la ventana.
 * Evalúa los breakpoints en orden y retorna el valor del primero que coincida.
 * Si ninguno coincide, retorna el valor por defecto.
 *
 * @param {Breakpoint[]} breakpoints - Lista de breakpoints ordenados de menor a mayor maxWidth.
 * @param {*} defaultValue - Valor por defecto cuando ningún breakpoint aplica.
 * @returns {*} El valor correspondiente al breakpoint activo.
 *
 * @example
 * // Retorna 2 en pantallas <=375px, 3 en el resto
 * const maxClubs = useBreakpointValue([{ maxWidth: 375, value: 2 }], 3);
 */
export default function useBreakpointValue(breakpoints, defaultValue) {
    const getActiveValue = () => {
        for (const bp of breakpoints) {
            if (window.innerWidth <= bp.maxWidth) return bp.value;
        }
        return defaultValue;
    };

    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const update = () => setValue(getActiveValue());
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return value;
}
