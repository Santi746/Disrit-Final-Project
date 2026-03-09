"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      once: true, // Que la animación corra solo la primera vez que se hace scroll
      duration: 500, // Duración de la animación (0.5s)
      easing: "ease-out-cubic", // curva de aceleración
    });
  }, []);

  return null;
}
