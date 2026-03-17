"use client";

import React from "react";
import { Users, TrendingUp } from "lucide-react";
import Badge from "../atoms/Badge";
import VerifiedIcon from "../atoms/VerifiedIcon";

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
  const {
    title,
    tag,
    description,
    image,
    Logo,
    members,
    online,
    bottomText,
    Verified,
  } = club;

  return (
    <div className="group border-forest-border bg-forest-deep hover:border-forest-accent/50 relative w-full cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]">
      {/* BANNER: Imagen de fondo con gradiente suave inferior */}
      <div className="relative h-28 w-full overflow-hidden">
        <img
          src={image}
          alt={`Banner for ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
        />
        {/* Sombra para integrar el banner con el color de la tarjeta */}
        <div className="from-forest-deep absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t to-transparent" />

        {/* TAG */}
        <Badge className="absolute top-3 right-3">{tag}</Badge>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative px-4 pt-10 pb-4">
        {/* ICONO / AVATAR */}
        <div className="border-forest-deep bg-forest-card absolute -top-7 left-4 h-14 w-14 overflow-hidden rounded-full border-4">
          <div className="bg-forest-accent-dark/20 flex h-full w-full items-center justify-center">
            <img
              src={Logo}
              alt={`${title} Logo`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* CONTENEDOR DE TEXTOS */}
        <div>
          {/* TÍTULO Y VERIFICADO */}
          <h3 className="text-forest-light flex items-center gap-1.5 text-[17px] font-bold">
            {title}
            {Verified && <VerifiedIcon />}
          </h3>

          {/* DESCRIPCIÓN */}
          <p className="text-forest-muted mt-1 line-clamp-2 text-[13px] leading-snug font-medium">
            {description}
          </p>
        </div>

        {/* STATS */}
        <div className="text-forest-muted mt-3 flex items-center gap-3 text-[13px] font-semibold">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {members}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-forest-accent h-2 w-2 rounded-full"></span>
            {online} online
          </span>
        </div>

        {/* BOTTOM ACTION */}
        {bottomText && (
          <div className="bg-forest-stat border-forest-border-faint hover:bg-forest-stat/80 mt-4 flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors">
            <TrendingUp className="text-forest-accent h-3.5 w-3.5" />
            <span className="text-forest-muted truncate text-[13px] font-medium">
              {bottomText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
