"use client";

import { useState } from "react";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
import Button from "../atoms/Button";

/**
 * @component CategoryChips
 * @description Renderiza una barra horizontal de navegación rápida (chips) hacia las secciones de categorías de clubes.
 * Posee scroll manual infinito amigable en móviles, efecto "Glassmorphism" con los colores del tema y
 * delega la acción de desplazamiento del documento a un custom hook (useSmoothScroll).
 * 
 * @param {Object} props
 * @param {Array} props.categories - Lista de categorías.
 */
export default function CategoryChips({ categories = [] }) {
  const { scrollToSection } = useSmoothScroll();
  const [activeChip, setActiveChip] = useState(null);

  /**
   * Maneja el clic en un chip de categoría.
   * @param {number} id - El ID de la categoría (proveniente de CLUB_SECTION_TITLE).
   */
  const handleChipClick = (id) => {
    setActiveChip(id);
    const sectionId = `category-${id}`;
    // Pasamos 140 de offset para librar la altura de la SearchBar y de los Chips "Sticky" (si los hubiera)
    scrollToSection(sectionId, 160);
  };

  return (
    <nav
      className="mb-2 w-full overflow-hidden"
      aria-label="Navegación Rápida de Categorías"
      data-aos="fade-in"
      data-aos-delay="150"
    >
      {/* Contenedor del scroll: usa [&::-webkit-scrollbar]:hidden para móviles y scroll-smooth */}
      <ul className="flex items-center gap-3 overflow-x-auto scroll-smooth py-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = activeChip === category.id;
          return (
            <li key={category.id} className="flex-none shrink-0">
              <Button
                onClick={() => handleChipClick(category.id)}
                type="button"
                aria-pressed={isActive}
                variant={isActive ? "chip-active" : "chip-inactive"}
                className="backdrop-blur-md"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-300 ${isActive ? "text-forest-dark" : "text-forest-accent"} [&>svg]:h-full [&>svg]:w-full`}
                >
                  {category.icon}
                </span>
                <span>{category.title}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
