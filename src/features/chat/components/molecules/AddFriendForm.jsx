"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

/**
 * @molecule AddFriendForm
 * @description Formulario para añadir amigos por nombre de usuario.
 * Visualmente idéntico a Discord: input con botón integrado.
 *
 * @component
 */
export default function AddFriendForm() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = username.trim();
    if (!clean) return;

    // ❌ [Vyne-Delete-On-Backend]: Simulación de resultado
    if (clean.length >= 3) {
      setStatus("success");
      toast.success(`Solicitud de amistad enviada a ${clean}`);
    } else {
      setStatus("error");
    }
  };

  const borderColor = status === "success"
    ? "border-forest-accent"
    : status === "error"
      ? "border-forest-danger"
      : "border-forest-border";

  return (
    <div className="px-6 py-6 sm:px-8">
      {/* Título y descripción */}
      <h2 className="text-base font-bold text-forest-light uppercase tracking-wide">
        Añadir amigos
      </h2>
      <p className="text-sm text-forest-muted mt-1 mb-4">
        Puedes añadir amigos con su nombre de usuario.
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center gap-2 rounded-lg border-2 ${borderColor} bg-forest-deep px-3 py-2.5 transition-colors`}>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setStatus(null);
            }}
            placeholder="Puedes añadir amigos con su nombre de usuario. Ej: usuario#1234"
            className="min-w-0 flex-1 bg-transparent text-sm text-forest-light placeholder:text-forest-placeholder outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!username.trim()}
            className={`shrink-0 rounded-md px-4 py-1.5 text-xs font-bold transition-colors ${
              username.trim()
                ? "bg-forest-accent text-forest-dark cursor-pointer hover:bg-forest-accent/80"
                : "bg-forest-accent/30 text-forest-muted cursor-not-allowed"
            }`}
          >
            Enviar solicitud de amistad
          </motion.button>
        </div>
      </form>

      {/* Feedback */}
      {status === "error" && (
        <p className="text-xs text-forest-danger mt-2">
          Hmm, no pudimos encontrar ese usuario. Asegúrate de que el nombre sea correcto.
        </p>
      )}
      {status === "success" && (
        <p className="text-xs text-forest-accent mt-2">
          ¡Solicitud de amistad enviada exitosamente!
        </p>
      )}
    </div>
  );
}
