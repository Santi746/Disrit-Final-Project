"use client";

import React from "react";

/**
 * @typedef {Object} Club
 * @property {string} title - The name of the club.
 * @property {string} description - A brief summary of what the club is about.
 * @property {string} tag - The category or label (e.g., "Verified", "Tech", "Design").
 * @property {string} image - The URL for the large background cover image.
 * @property {string} Logo - The URL for the club's avatar logo.
 * @property {string} members - The total number of members (e.g., "12.4k").
 * @property {string} online - The number of online members (e.g., "1.2k").
 * @property {string} [bottomText] - Optional trending text shown at the bottom.
 * @property {boolean} Verified - True if the club is officially verified.
 */

/**
 * ClubCard component displays a stylized card with information about a specific community/club.
 * Contains hover animations, an image banner, and a floating icon logo.
 *
 * @param {Object} props - Component properties.
 * @param {Club} props.club - The club data object to render.
 */
export default function ClubCard({ club }) {
  // Destructure exact fields as per requirements
  const { title, tag, description, image, Logo, members, online, bottomText, Verified } = club;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-[#1f2e1f] bg-[#0b100b] transition-all hover:border-[#22c55e]/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] cursor-pointer">
      
      {/* BANNER: Imagen de fondo con gradiente suave inferior */}
      <div className="relative h-26 w-full">
        <img 
          src={image}
          alt={`Banner for ${title}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Sombra para integrar el banner con el color de la tarjeta */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#0b100b] to-transparent" />
        
        {/* TAG */}
        <span className="absolute top-3 right-3 rounded-full bg-[#5eb669] px-2.5 py-0.5 text-[11px] font-bold text-[#060906]">
          {tag}
        </span>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative px-4 pb-4 pt-10">
        
        {/* ICONO / AVATAR */}
        <div className="absolute -top-7 left-4 h-14 w-14 overflow-hidden rounded-full border-4 border-[#0b100b] bg-[#060906]">
          <div className="flex h-full w-full items-center justify-center bg-[#131317]">
            <img src={Logo} alt={`${title} Logo`} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* CONTENEDOR DE TEXTOS */}
        <div>
          {/* TÍTULO Y VERIFICADO */}
          <h3 className="flex items-center gap-1.5 text-[17px] font-bold text-[#e8f5e8]">
            {title}
            {Verified && (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-[#22c55e]">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
          </h3>
          
          {/* DESCRIPCIÓN */}
          <p className="mt-1 text-[13px] font-medium text-[#6b8a6b] leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* STATS */}
        <div className="mt-3 flex items-center gap-3 text-[13px] font-semibold text-[#6b8a6b]">
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {members}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
            {online} online
          </span>
        </div>

        {/* BOTTOM ACTION */}
        {bottomText && (
          <div className="mt-4 rounded-xl bg-[#121a12] px-3 py-2 flex items-center gap-2 border border-[#1f2e1f]/40 hover:bg-[#1a231a] transition-colors">
            <svg className="h-3.5 w-3.5 text-[#22c55e]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <span className="text-[13px] font-medium text-[#6b8a6b] truncate">{bottomText}</span>
          </div>
        )}

      </div>
    </div>
  );
}