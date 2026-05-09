"use client";

import { useEffect, useRef } from "react";

/**
 * @hook useClickClose
 * @description Detecta clics fuera de un elemento para ejecutar un cierre (ej. menús).
 *
 * @param {Function} handler - Función de cierre (callback).
 * @returns {React.RefObject} ref - Referencia para vincular al elemento HTML.
 */
export default function useClickClose(handler) {
    const ref = useRef(null);

    useEffect(() => { 

        const listener = (event) => {
            if ( ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        }; 
    }, [handler]);

    return ref;
}