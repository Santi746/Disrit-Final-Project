"use client";

import CardinalStar from "../atoms/CardinalStar";
import SearchBar from "../molecules/SearchBar";
import DiscoverySection from "./DiscoverySection";
import DiscoveryFeatured from "./DiscoveryFeatured";
import { CLUBS_DATA } from "@/app/data/ClubCardInfo";
import { discoveryInfo } from "@/app/data/DiscoveryInfo";

/**
 * Dashboard Component
 * Sigue la lógica de Sidebar: Mapea un array de datos (discoveryInfo)
 * para generar las secciones dinámicamente.
 */
export default function Dashboard() {
    return (
        <section className="flex flex-col pb-12 px-2 pt-6 gap-6 md:px-12 lg:px-24 xl:px-28" data-aos="fade-up">
            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 min-h-[80px]">
                <div className="flex flex-col gap-1.5 z-10">
                    <h1 className="text-white font-extrabold text-[28px] tracking-tight">Descubre Comunidades</h1>
                    <p className="text-[#7d9b7d] text-[15px] font-medium">Encuentra tu comunidad Ideal y comienza a conectarte</p>
                </div>
                <CardinalStar />
            </div>

            <SearchBar />

            {/* SECCIÓN DESTACADA (Estructura de 3 columnas) */}
            <DiscoveryFeatured 
                name="Verified & Featured" 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#22c55e]">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                }
                clubs={CLUBS_DATA}
            />

            {/* SECCIONES DINÁMICAS (Lógica de sidebarInfo.js) */}
            {discoveryInfo.map((category) => (
                <DiscoverySection 
                    key={category.id} 
                    {...category} 
                    clubs={CLUBS_DATA} 
                />
            ))}
        </section>
    );
}