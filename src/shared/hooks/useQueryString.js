"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook personalizado para manejar los parámetros de búsqueda de la URL.
 * Facilita la creación de enlaces y la actualización de la URL preservando
 * el estado existente de otros parámetros.
 *
 * @returns {{ createQueryString: (name: string, value?: string|null) => string }}
 */
export function useQueryString() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /**
   * Crea una nueva cadena de URL basada en la ruta y los parámetros actuales,
   * añadiendo o eliminando un parámetro específico o múltiples.
   *
   * @param {string|Object} nameOrParams - El nombre del parámetro o un objeto con múltiples pares clave-valor.
   * @param {string|null} [value] - El valor del parámetro (si el primero es un string). Si es null o undefined, el parámetro se elimina.
   * @returns {string} - La URL completa con los nuevos parámetros (ej: /path?param=value).
   */
  const createQueryString = useCallback(
    (nameOrParams, value) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (typeof nameOrParams === "object" && nameOrParams !== null) {
        Object.entries(nameOrParams).forEach(([k, v]) => {
          if (v === null || v === undefined) {
            params.delete(k);
          } else {
            params.set(k, v);
          }
        });
      } else {
        if (value === null || value === undefined) {
          params.delete(nameOrParams);
        } else {
          params.set(nameOrParams, value);
        }
      }
      
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [searchParams, pathname]
  );

  return { createQueryString };
}
