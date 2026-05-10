"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CLUB_TYPES } from "@/features/clubs/data/club_types";

/**
 * Molécula: Paso 2 del formulario de creación de club.
 * Maneja la selección del tipo de club y etiquetas adicionales.
 * @component ClubTypeStep
 */
export default function ClubTypeStep({
  selectedType,
  setSelectedType,
  fandomTag,
  setFandomTag,
  onSubmit,
  isValid,
  isPending,
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-forest-muted">
        Selecciona el tipo que mejor represente tu comunidad.
      </p>

      {/* Grid de tipos de club */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto no-scrollbar pr-1">
        {CLUB_TYPES.map((type) => {
          const isSelected = selectedType === type.uuid;
          return (
            <button
              key={type.uuid}
              onClick={() => {
                setSelectedType(type.uuid);
                if (!type.requiresCustomTag) setFandomTag("");
              }}
              className={`group flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3.5 text-center transition-all duration-200 ${
                isSelected
                  ? "border-forest-accent bg-forest-accent/10 shadow-glow"
                  : "border-forest-border bg-forest-stat/40 hover:border-forest-accent/30 hover:bg-forest-stat"
              }`}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span
                className={`text-xs font-bold ${
                  isSelected ? "text-forest-accent" : "text-forest-muted-alt group-hover:text-forest-light"
                }`}
              >
                {type.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Input condicional para Fandom */}
      <AnimatePresence>
        {selectedType &&
          CLUB_TYPES.find((t) => t.uuid === selectedType)?.requiresCustomTag && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1.5"
            >
              <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
                ¿De qué es tu Fandom/Comunidad?
              </label>
              <input
                type="text"
                value={fandomTag}
                onChange={(e) => setFandomTag(e.target.value)}
                placeholder="Ej: Naruto, MrBeast, Argentina..."
                maxLength={40}
                className="w-full rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
              />
              <p className="text-xs text-forest-muted">
                Tu club aparecerá como{" "}
                <span className="font-bold text-forest-accent">
                  f/{fandomTag || "..."}
                </span>
              </p>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Botón Crear Club */}
      <button
        onClick={onSubmit}
        disabled={!isValid || isPending}
        className={`w-full cursor-pointer rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
          isValid && !isPending
            ? "bg-forest-accent text-black shadow-btn-glow hover:shadow-btn-glow-hover hover:brightness-110 active:scale-98"
            : "cursor-not-allowed bg-forest-stat text-forest-muted"
        }`}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest-muted border-t-transparent" />
            Creando...
          </span>
        ) : (
          "Crear Club"
        )}
      </button>
    </div>
  );
}
