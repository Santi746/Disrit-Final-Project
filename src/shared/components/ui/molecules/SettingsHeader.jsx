"use client";

import React from "react";

/**
 * @file SettingsHeader.jsx
 * @description Molécula para los encabezados de página de ajustes.
 *
 * @component SettingsHeader
 * @param {Object} props
 * @param {string} props.title - Título principal.
 * @param {string} [props.description] - Texto descriptivo opcional.
 */
export default function SettingsHeader({ title, description }) {
  return (
    <div className="mb-2">
      <h2 className="text-forest-light text-xl font-bold mb-1">{title}</h2>
      {description && (
        <p className="text-forest-muted text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
