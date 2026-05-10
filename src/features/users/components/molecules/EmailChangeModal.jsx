"use client";

import React, { useState } from "react";
import { FiMail, FiX } from "react-icons/fi";
import SettingsButton from "@/shared/components/ui/atoms/SettingsButton";

/**
 * @file EmailChangeModal.jsx
 * @description Molécula para gestionar el cambio de correo electrónico.
 *
 * @component EmailChangeModal
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está visible.
 * @param {Function} props.onClose - Acción al cerrar.
 */
export default function EmailChangeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.includes("@") && password.length >= 6;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-200000" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-forest-card border border-forest-border rounded-2xl p-5 sm:p-6 w-full max-w-md mx-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-forest-muted hover:text-forest-light transition-colors">
          <FiX size={17} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-forest-accent/10 flex items-center justify-center text-forest-accent shrink-0">
            <FiMail size={17} />
          </div>
          <div>
            <h3 className="text-forest-light font-bold text-sm">Correo electrónico</h3>
            <p className="text-forest-muted text-[11px] mt-0.5">Se enviará un enlace de verificación</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-forest-muted text-[10px] font-bold uppercase tracking-widest">Nuevo correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nuevo@ejemplo.com"
              className="bg-forest-deep border border-forest-border focus:border-forest-accent/50 rounded-lg px-3 py-2.5 text-forest-light text-sm outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-forest-muted text-[10px] font-bold uppercase tracking-widest">Contraseña actual</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-forest-deep border border-forest-border focus:border-forest-accent/50 rounded-lg px-3 py-2.5 text-forest-light text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <SettingsButton variant="secondary" onClick={onClose}>Cancelar</SettingsButton>
          <SettingsButton
            variant="primary"
            onClick={() => { if (canSubmit) onClose(); }}
            disabled={!canSubmit}
          >
            Verificar
          </SettingsButton>
        </div>
      </div>
    </div>
  );
}
