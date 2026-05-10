"use client";

import React, { useState, useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { toast } from "sonner";

/**
 * @file EditableRow.jsx
 * @description Molécula para una fila editable con validación y guardado individual.
 * Común en ajustes de cuenta.
 *
 * @component EditableRow
 * @param {Object} props
 * @param {string} props.label - Etiqueta del campo.
 * @param {React.ReactNode} [props.icon] - Icono representativo.
 * @param {string} props.value - Valor actual.
 * @param {string} [props.readonlySuffix] - Sufijo que no se edita (ej. #0001).
 * @param {Function} props.onSave - Callback al guardar el valor.
 */
export default function EditableRow({ label, icon, value, readonlySuffix = "", onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  const startEdit = () => {
    setDraft(value);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const save = () => {
    if (draft !== value) {
      onSave?.(draft);
      toast.info(`Cambiando ${label.toLowerCase()}...`);
    }
    setEditing(false);
  };

  return (
    <div className="flex items-start sm:items-center justify-between py-3.5 border-b border-forest-border/30 last:border-0 gap-3 min-w-0 w-full">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {icon && <span className="text-forest-muted shrink-0">{icon}</span>}
          <p className="text-forest-muted text-[10px] font-bold uppercase tracking-widest truncate">{label}</p>
        </div>
        {editing ? (
          <div className="flex items-center gap-1 mt-1">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") cancel(); }}
              className="bg-forest-deep border border-forest-accent/40 focus:border-forest-accent rounded-md px-2.5 py-1 text-forest-light text-sm outline-none transition-colors min-w-0 flex-1"
            />
            {readonlySuffix && (
              <span className="text-forest-muted text-sm font-mono shrink-0">{readonlySuffix}</span>
            )}
          </div>
        ) : (
          <p className="text-forest-light text-[13px] sm:text-sm font-medium truncate">
            {value}<span className="text-forest-muted/60">{readonlySuffix}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0 mt-1 sm:mt-0">
        {editing ? (
          <>
            <button onClick={save} className="w-7 h-7 rounded-md bg-forest-accent/15 hover:bg-forest-accent/30 text-forest-accent flex items-center justify-center transition-colors">
              <FiCheck size={13} strokeWidth={2.5} />
            </button>
            <button onClick={cancel} className="w-7 h-7 rounded-md bg-forest-stat hover:bg-forest-border text-forest-muted flex items-center justify-center transition-colors">
              <FiX size={13} strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <button onClick={startEdit} className="text-[11px] font-semibold text-forest-muted hover:text-forest-light bg-forest-stat hover:bg-forest-border border border-forest-border/60 rounded-md px-2.5 py-1.5 transition-colors">
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
