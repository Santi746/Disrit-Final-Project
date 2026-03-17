"use client";

import React from "react";
import ClubCard from "../molecules/ClubCard";

/**
 * Componente Organismo: ClubsCategories
 * @description Muestra los clubes agrupados por sus respectivas categorías.
 *
 * @param {Object} props
 * @param {Array} props.categories - Lista de categorías.
 * @returns {JSX.Element} Lista de secciones con categorías y sus clubes.
 */
export default function ClubsCategories({ categories = [] }) {
  return (
    <>
      {/* Listado de Categorías */}
      {categories.map((category) => (
        <section key={category.id} className="mb-12 flex flex-col gap-4">
          {/* Encabezado de la categoría: Ícono + Título */}
          <div className="text-forest-light flex items-center gap-2">
            <span className="text-forest-accent h-6 w-6">{category.icon}</span>
            <h2 className="text-xl font-bold">{category.title}</h2>
          </div>

          {/* Cuadrícula de Clubes: Diseño responsivo (1 a 5 columnas) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {category.clubs.map((club, i) => (
              <ClubCard key={`cat-${category.id}-club-${i}`} club={club} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
