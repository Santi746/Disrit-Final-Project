import React from "react";

/**
 * @component SettingsInput
 * @description Input estandarizado para formularios de configuración.
 *
 * @param {string} label - Etiqueta superior.
 * @param {string} placeholder - Texto de marcador de posición.
 * @param {string} value - Valor actual (para componente controlado).
 * @param {function} onChange - Función para actualizar el estado.
 * @param {string} type - Tipo de input (texto por defecto).
 * @param {React.ReactNode} rightElement - Elemento opcional a la derecha (ej. ícono).
 */
export default function SettingsInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  rightElement,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold tracking-widest uppercase text-forest-muted">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-forest-card border-2 border-forest-border hover:border-forest-border-faint focus:border-forest-accent rounded-lg px-3 py-2 text-forest-light placeholder-forest-placeholder outline-none transition-colors duration-200"
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
