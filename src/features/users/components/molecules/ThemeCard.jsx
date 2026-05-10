"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";

/**
 * @file ThemeCard.jsx
 * @description Molécula para representar una opción de tema visual.
 * 
 * MEJORA ARQUITECTÓNICA:
 * Usa el atributo [data-theme] en el contenedor de previsualización.
 * Esto permite que las clases bg-forest-* se resuelvan dinámicamente
 * según el tema, eliminando la necesidad de pasar hexadecimales desde JS.
 */
export default function ThemeCard({ theme, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
        isActive
          ? "border-forest-accent bg-forest-stat/50"
          : "border-forest-border hover:border-forest-muted bg-forest-card"
      }`}
    >
      {/* Contenedor de previsualización: aplica el tema localmente */}
      <div
        data-theme={theme.id}
        className="w-full h-16 rounded-lg border border-forest-border shadow-inner flex items-center justify-center relative overflow-hidden bg-forest-dark"
      >
        <div className="w-6 h-6 rounded-full bg-forest-accent shadow-lg shadow-forest-accent/20" />
        
        {isActive && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
            <FiCheck size={20} className="text-white" />
          </div>
        )}
      </div>
      
      <span className="text-[13px] font-bold text-forest-light tracking-tight">
        {theme.name}
      </span>
    </button>
  );
}
