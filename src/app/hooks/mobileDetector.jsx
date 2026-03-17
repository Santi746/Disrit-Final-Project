"use client";

import { useState, useEffect } from "react";

/**
 * Hook personalizado para detectar si la pantalla del usuario es tamaño móvil (<=768px).
 * @returns {boolean} `true` si es móvil, `false` en caso contrario.
 */
export default function useMobileDetector() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}
