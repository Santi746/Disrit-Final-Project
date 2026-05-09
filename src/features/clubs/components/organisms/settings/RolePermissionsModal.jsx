"use client";

/**
 * @file RolePermissionsModal.jsx
 * @description Modal informativo (infomodal) que muestra de forma visual 
 * y en formato de tabla comparativa los permisos predeterminados de los roles fijos
 * del servidor (Owner, Administrator, Moderator).
 * Implementa diseño mobile-first con scroll horizontal nativo.
 */

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus } from "lucide-react";

const PERMISSIONS = [
  { id: "all", label: "Control Total del Servidor" },
  { id: "manage_roles", label: "Gestionar Roles" },
  { id: "manage_channels", label: "Gestionar Canales" },
  { id: "kick", label: "Expulsar Miembros" },
  { id: "ban", label: "Banear Miembros" },
  { id: "manage_messages", label: "Gestionar Mensajes" },
];

const ROLES_INFO = [
  { name: "Owner", color: "#eab308", perms: ["all", "manage_roles", "manage_channels", "kick", "ban", "manage_messages"] },
  { name: "Administrator", color: "#3b82f6", perms: ["manage_roles", "manage_channels", "kick", "ban", "manage_messages"] },
  { name: "Moderator", color: "#22c55e", perms: ["kick", "ban", "manage_messages"] },
];

/**
 * @component RolePermissionsModal
 * @description Componente Modal que renderiza la matriz de permisos.
 * Utiliza Framer Motion para animaciones de entrada/salida y React Portal
 * para asegurar que se superponga sobre todo el árbol DOM (z-[999999]).
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClose - Función callback que se ejecuta al cerrar el modal (clic fuera, ESC o botón X)
 * @returns {React.ReactPortal}
 */
export default function RolePermissionsModal({ onClose }) {
  // ESC para cerrar
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-forest-card border border-forest-border rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-forest-border bg-forest-stat/30">
            <div>
              <h2 className="text-xl font-bold text-forest-light">Jerarquía de Roles Fijos</h2>
              <p className="text-sm text-forest-muted mt-1">
                Conoce los permisos predeterminados de los roles inmutables del servidor.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-forest-muted hover:text-forest-light hover:bg-forest-stat p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabla de Permisos con Scroll Horizontal en Móvil */}
          <div className="p-6 overflow-x-auto no-scrollbar">
            <div className="min-w-[600px]">
              {/* Header de la Tabla */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 mb-4 pb-2 border-b-2 border-forest-border">
                <div className="text-xs font-bold tracking-widest uppercase text-forest-muted">Permiso</div>
                {ROLES_INFO.map(r => (
                  <div key={r.name} className="flex flex-col items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="text-sm font-bold" style={{ color: r.color }}>{r.name}</span>
                  </div>
                ))}
              </div>

              {/* Filas de Permisos */}
              <div className="flex flex-col gap-2">
                {PERMISSIONS.map((perm, idx) => (
                  <div 
                    key={perm.id} 
                    className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 px-2 rounded-lg items-center ${
                      idx % 2 === 0 ? "bg-forest-stat/20" : ""
                    } hover:bg-forest-stat transition-colors`}
                  >
                    <div className="text-sm font-medium text-forest-light pl-2">{perm.label}</div>
                    
                    {ROLES_INFO.map(role => {
                      const hasPerm = role.perms.includes(perm.id) || role.perms.includes("all");
                      return (
                        <div key={`${role.name}-${perm.id}`} className="flex justify-center">
                          {hasPerm ? (
                            <div className="w-6 h-6 rounded-full bg-forest-accent/20 flex items-center justify-center">
                              <Check size={14} className="text-forest-accent" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-forest-muted">
                              <Minus size={14} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-forest-border bg-forest-dark flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-forest-accent hover:bg-forest-accent-light text-forest-deep font-bold rounded-lg transition-colors text-sm"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
