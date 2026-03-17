"use client";

import ClubCard from "../molecules/ClubCard";

/**
 * Componente Organismo: ClubsFeatured
 * @description Renderiza la sección principal de Descubrimiento de la aplicación.
 *
 * @param {Object} props
 * @param {Array} props.featuredClubs - Lista de clubes destacados (Los Mejores Para Ti).
 * @param {Array} props.categories - Lista de categorías (título, icono, clubes).
 * @returns {JSX.Element} Un contenedor flex vertical con múltiples secciones de cuadrículas de tarjetas.
 */
export default function ClubsFeatured({ featuredClubs = [], categories = [] }) {
  return (
    <div className="flex flex-col gap-12 pt-4 pb-12">
      {/* SECCIÓN 1: Clubes Destacados (Los Mejores Para Ti) */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-forest-light text-2xl font-bold">
            Los Mejores Para Ti
          </h2>
        </div>
        {/* Cuadrícula para los destacados: 3 columnas máximo para mostrar tarjetas grandes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Iteramos directamente sobre los clubes destacados importados */}
          {featuredClubs.map((club, i) => (
            <ClubCard key={`featured-${i}`} club={club} />
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: Clubes organizados por Categoría (Videojuegos, Tecnología, etc) */}
      {categories.map((category) => (
        <section
          key={category.id}
          id={`category-${category.id}`}
          className="flex scroll-mt-[180px] flex-col gap-4"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          {/* Encabezado de la categoría con su ícono y título */}
          <div className="text-forest-light flex items-center gap-2">
            <span className="text-forest-accent flex h-6 w-6 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
              {category.icon}
            </span>
            <h2 className="text-xl font-bold">{category.title}</h2>
          </div>
          {/* Cuadrícula para los clubes grupales: hasta 5 columnas por fila para un display más compacto */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Mapea los clubes específicos de ESTA categoría, ya asignados estáticamente en la data */}
            {category.clubs.map((club, i) => (
              <ClubCard key={`cat-${category.id}-club-${i}`} club={club} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
