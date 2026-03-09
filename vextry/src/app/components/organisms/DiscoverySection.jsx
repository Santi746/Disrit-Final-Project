"use client";

import React from "react";
import ClubCard from "../molecules/ClubCard";

/**
 * DiscoverySection Component
 * Follows the Sidebar pattern: receives minimal props and decides layout internally.
 * 
 * @param {Object} props
 * @param {string} props.name - The section name (used to determine layout).
 * @param {React.ReactNode} props.icon - The section icon.
 * @param {Array} props.clubs - The list of clubs to render.
 */
export default function DiscoverySection({ name, icon, clubs }) {
        {/* La structura o forma de la Discovery section*/}

    return (
        <div className="mt-10 flex flex-col gap-4 px-2">  {/*Structura de Nombre y Icono Por seccion */}
            <h2 className="text-white font-bold text-xl mb-2 flex items-center gap-2 border-b border-[#1f2e1f] pb-2">
                {icon && icon}
                {name}
            </h2>
            
            {/* Contenedor Padre (Límite estricto de fila única) */}
            <section className={`grid grid-rows-1 overflow-hidden`}>
                {/* Contenedor Hijo (La cuadrícula) Aquel que le dice cuantas cards habra en la Seccion others clubs.*/}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5`}>
                    {clubs.map((club, idx) => (
                        <div key={`club-${idx}`} className="transform transition-all duration-300 hover:-translate-y-1">
                            <ClubCard club={club} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
