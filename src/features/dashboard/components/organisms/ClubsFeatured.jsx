"use client";

import ClubCard from "@/features/clubs/components/molecules/ClubCard";
import { motion } from "framer-motion";

/**
 * Renderiza la sección principal de Descubrimiento de la aplicación.
 * @component ClubsFeatured
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
          {featuredClubs && featuredClubs.length > 0 ? (
            featuredClubs.map((club, i) => (
              <ClubCard key={`featured-${club.uuid || i}`} club={club} />
            ))
          ) : (
            <div className="text-forest-muted col-span-full py-10 text-center">No hay clubes destacados disponibles</div>
          )}
        </div>
      </section>

      {/* SECCIÓN 2: Clubes organizados por Categoría (Videojuegos, Tecnología, etc) */}
      {categories.map((category) => (
        <motion.section
          key={category.uuid}
          id={`category-${category.uuid}`}
          className="flex scroll-mt-45 flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {/* Encabezado de la categoría con su ícono y título */}
          <div className="text-forest-light flex items-center gap-2">
            <span className="text-forest-accent flex h-6 w-6 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
              {category.icon}
            </span>
            <h2 className="text-xl font-bold">{category.name}</h2>
          </div>
          {/* Cuadrícula para los clubes grupales: hasta 5 columnas por fila para un display más compacto */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Mapea los clubes específicos de ESTA categoría */}
            {category.clubs?.slice(0, 4).map((club, i) => (
              <ClubCard key={`cat-${category.uuid}-club-${i}`} club={club} />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

