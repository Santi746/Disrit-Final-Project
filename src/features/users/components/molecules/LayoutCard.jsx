"use client";

import React from "react";

/**
 * @file LayoutCard.jsx
 * @description Molécula para representar una opción de disposición de sidebar.
 *
 * @component LayoutCard
 * @param {Object} props
 * @param {string} props.id - ID del layout.
 * @param {string} props.label - Etiqueta visible.
 * @param {React.ReactNode} props.icon - Icono descriptivo.
 * @param {boolean} props.isActive - Si es el seleccionado.
 * @param {Function} props.onClick - Acción al seleccionar.
 * @param {React.ReactNode} props.preview - Renderizado de previsualización.
 */
export default function LayoutCard({ id, label, icon, isActive, onClick, preview }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative flex flex-col items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
        isActive
          ? "border-forest-accent bg-forest-stat/50 shadow-btn-glow"
          : "border-forest-border hover:border-forest-muted bg-forest-card"
      }`}
    >
      <div className="flex items-center gap-2 text-forest-light">
        <span className={isActive ? "text-forest-accent" : "text-forest-muted"}>
          {icon}
        </span>
        <span className="font-bold text-sm">{label}</span>
      </div>
      
      <div className="w-full h-28 bg-forest-deep rounded-lg border border-forest-border relative overflow-hidden">
        {preview}
      </div>
    </button>
  );
}
