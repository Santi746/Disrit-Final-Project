"use client";

import { Upload, ImageIcon } from "lucide-react";

/**
 * Molécula: Paso 1 del formulario de creación de club.
 * Maneja la identidad visual y básica del club.
 * @component ClubIdentityStep
 */
export default function ClubIdentityStep({
  name,
  setName,
  description,
  setDescription,
  logoPreview,
  bannerPreview,
  onFileSelect,
  onNext,
  isValid,
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Banner Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
          Banner
        </label>
        <label
          htmlFor="banner-upload"
          className="group relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-forest-border transition-colors hover:border-forest-accent/50"
        >
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Banner preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-forest-muted transition-colors group-hover:text-forest-accent">
              <Upload size={24} />
              <span className="text-xs font-medium">Subir banner</span>
            </div>
          )}
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFileSelect(e, "banner")}
          />
        </label>
      </div>

      {/* Logo Upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
          Logo
        </label>
        <label
          htmlFor="logo-upload"
          className="group relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-forest-border transition-colors hover:border-forest-accent/50"
        >
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 text-forest-muted transition-colors group-hover:text-forest-accent">
              <ImageIcon size={20} />
              <span className="text-[9px] font-bold">LOGO</span>
            </div>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFileSelect(e, "logo")}
          />
        </label>
      </div>

      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
          Nombre del Club
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Gamers Legends"
          maxLength={50}
          className="w-full rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="¿De qué trata tu club?"
          maxLength={300}
          rows={3}
          className="w-full resize-none rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
        />
        <span className="text-right text-xs text-forest-muted">
          {description.length}/300
        </span>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        disabled={!isValid}
        className={`w-full cursor-pointer rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
          isValid
            ? "bg-forest-accent text-black shadow-btn-glow hover:shadow-btn-glow-hover hover:brightness-110 active:scale-98"
            : "cursor-not-allowed bg-forest-stat text-forest-muted"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
