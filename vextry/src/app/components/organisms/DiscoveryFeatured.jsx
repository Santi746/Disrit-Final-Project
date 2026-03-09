"use client";

import ClubCard from "../molecules/ClubCard";

/**
 * DiscoveryFeatured Component
 * Estructura de 3 columnas para clubes destacados.
 */
export default function DiscoveryFeatured({ name, icon, clubs }) {
    if (!clubs || clubs.length === 0) return null;

    // Solo mostramos los primeros 3 para la sección destacada
    const featuredClubs = clubs.slice(0, 3);

    return (
        <div className="mt-10 flex flex-col gap-4 px-2">
            <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-2 border-b border-[#1f2e1f] pb-2">
                {icon && icon}
                {name}
            </h2>

            <section className="grid grid-rows-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuredClubs.map((club, idx) => (
                        <ClubCard key={`featured-${idx}`} club={club} />
                    ))}
                </div>
            </section>
        </div>
    );
}