"use client";

import React from "react";

/**
 * @file SettingsSection.jsx
 * @description Molécula para estandarizar las secciones de los ajustes.
 * Proporciona un título, una descripción opcional y un contenedor para el contenido.
 *
 * @component SettingsSection
 * @param {Object} props
 * @param {string} props.title - Título de la sección.
 * @param {string} [props.description] - Descripción de la sección.
 * @param {React.ReactNode} props.children - Contenido de la sección.
 * @param {string} [props.className] - Clases adicionales para el contenedor.
 */
export default function SettingsSection({ title, description, children, className = "" }) {
  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      <div>
        {title && (
          <h3 className="text-forest-muted text-[11px] font-bold tracking-widest uppercase mb-1">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-forest-muted-alt text-xs leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
}
