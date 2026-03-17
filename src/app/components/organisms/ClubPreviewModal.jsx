"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, CalendarDays, X, ShieldCheck } from "lucide-react";
import { CLUB_MODAL_DATA } from "@/app/data/clubs/clubModalData";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import VerifiedIcon from "../atoms/VerifiedIcon";
import CrownIcon from "../atoms/CrownIcon";

/**
 * Mapa de iconos para las tarjetas de estadísticas.
 * Se usa un Map para resolver el icono correcto por key sin necesidad de .filter().
 */
const STAT_ICONS = new Map([
  ["members", Users],
  ["online", TrendingUp],
  ["createdAt", CalendarDays],
]);

/**
 * Definición de las estadísticas a renderizar.
 * Cada stat toma su valor directamente de los campos existentes del club.
 */
const STATS = [
  { key: "members", value: CLUB_MODAL_DATA.members, label: "Miembros" },
  { key: "online", value: CLUB_MODAL_DATA.online, label: "Activos Hoy" },
  { key: "createdAt", value: CLUB_MODAL_DATA.createdAt, label: "Creado" },
];

/**
 * @component ClubPreviewModal
 * @description Modal de preview de un club estilo "Quick View".
 * Se muestra automáticamente con animación fade-in/scale-up al montar el componente.
 * Consume el DTO `CLUB_MODAL_DATA` que reutiliza campos existentes del catálogo de clubes.
 *
 * Secciones:
 * - Logo con iniciales + botón cerrar
 * - Título + badge verificado
 * - Tags (pills)
 * - Descripción
 * - 3 tarjetas de estadísticas (Miembros, Activos Hoy, Creado)
 * - Creador del club (avatar + nombre + corona)
 * - Botón "Unirse al Club"
 *
 * @returns {JSX.Element}
 */
export default function ClubPreviewModal() {
  const { title, verified, logo, image, description, tags, creator } =
    CLUB_MODAL_DATA;

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center gap-4 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-forest-dark border-forest-border my-auto w-full max-w-[400px] overflow-hidden rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        {/* ── Banner Header ── */}
        <div className="relative h-28 w-full overflow-hidden">
          <img
            src={image}
            alt="Banner del club"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="to-forest-deep via-forest-deep/40 absolute inset-0 bg-linear-to-b from-transparent" />
          <button
            className="bg-forest-dark/40 border-forest-border/50 text-forest-muted hover:bg-forest-dark/80 absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all hover:text-white active:scale-95"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Logo del Club ── */}
        <div className="relative -mt-10 px-5">
          <div className="bg-forest-stat border-forest-border flex h-16 w-16 items-center justify-center rounded-xl border-2 sm:h-[72px] sm:w-[72px]">
            <img
              src={logo}
              alt={`Logo de ${title}`}
              className="h-full w-full cursor-pointer rounded-xl object-cover"
            />
          </div>
        </div>

        {/* ── Contenido Principal ── */}
        <div className="flex flex-col gap-3.5 px-6 pt-1 pb-6">
          {/* Título + Verificado */}
          <div className="flex items-center gap-2">
            <h2 className="text-forest-light cursor-default text-lg font-bold tracking-tight sm:text-xl">
              {title}
            </h2>
            {verified && <VerifiedIcon />}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="custom"
                className="text-forest-muted bg-forest-stat/50 border-forest-border-faint hover:border-forest-accent/30 hover:text-forest-accent cursor-default border px-3 py-1 text-[11px] font-medium transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5 pt-1">
            <h3 className="text-forest-muted/60 text-[11px] font-bold tracking-widest uppercase">
              Descripción
            </h3>
            <p className="text-forest-muted-alt text-[13px] leading-relaxed sm:text-[14px]">
              {description}
            </p>
          </div>

          {/* ── Tarjetas de Estadísticas ── */}
          <div className="grid grid-cols-3 gap-1.5 py-1 sm:gap-3">
            {STATS.map((stat) => {
              const Icon = STAT_ICONS.get(stat.key);
              return (
                <div
                  key={stat.key}
                  className="bg-forest-stat border-forest-border-faint hover:border-forest-accent/20 hover:bg-forest-stat-accent/5 flex flex-col items-center gap-1 rounded-2xl border px-1 py-3.5 transition-all sm:gap-0 sm:px-2 sm:py-4.5"
                >
                  <Icon
                    size={20}
                    className="text-forest-accent/80 mb-1"
                    strokeWidth={2.5}
                  />
                  <span className="text-forest-light cursor-default text-base font-extrabold sm:text-lg">
                    {stat.value}
                  </span>
                  <span className="text-forest-muted/80 cursor-default text-center text-[9px] leading-tight font-medium tracking-tighter uppercase min-[360px]:text-[10px] sm:text-[11px] sm:tracking-tight">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-forest-border/60 h-px w-full" />

          {/* ── Creador del club ── */}
          <div className="flex flex-col gap-2">
            <h3 className="text-forest-muted/60 text-[11px] font-bold tracking-widest uppercase">
              Creador
            </h3>
            <div className="flex items-center gap-2.5">
              <div className="border-forest-border bg-forest-card h-9 w-9 overflow-hidden rounded-full border sm:h-10 sm:w-10">
                <img
                  src={creator.avatar}
                  alt={`Avatar de ${creator.name}`}
                  className="h-full w-full cursor-pointer object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-1">
                <span className="text-forest-light cursor-pointer truncate text-[14px] font-bold tracking-tighter sm:text-[15px]">
                  {creator.name}
                </span>
                <CrownIcon />
              </div>
            </div>
          </div>

          <div className="bg-forest-border/60 h-px w-full" />

          {/* ── Botón de Acción ── */}
          <Button variant="modal-action">
            <ShieldCheck size={18} strokeWidth={2.5} />
            Unirse al Club
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
