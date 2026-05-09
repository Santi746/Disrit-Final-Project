"use client";

/**
 * @file ServerProfileSettings.jsx
 * @description Sección general de los ajustes del club.
 * Permite modificar el nombre, descripción y el logo/banner del servidor.
 * Cuenta con un panel lateral con vista previa en tiempo real de cómo
 * se visualizará el perfil del servidor, y una barra flotante para guardar cambios.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import SettingsButton from "@/shared/components/ui/atoms/SettingsButton";
import { useMutateClub } from "@/features/clubs/hooks/useMutateClub";

import ClubPreviewCard from "../../molecules/settings/ClubPreviewCard";

export default function ServerProfileSettings({ club }) {
  // Estado para el borrador (draft) del formulario
  const [name, setName] = useState(club?.name || "");
  const [description, setDescription] = useState(club?.description || "");
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState(null);

  const { mutate, isPending } = useMutateClub();

  // Sincronizar si el club cambia externamente (ej. por WebSocket)
  useEffect(() => {
    if (!hasChanges) {
      setName(club?.name || "");
      setDescription(club?.description || "");
    }
  }, [club, hasChanges]);

  const handleReset = () => {
    setName(club?.name || "");
    setDescription(club?.description || "");
    setHasChanges(false);
  };

  const handleSave = () => {
    if (!club?.uuid) return;

    mutate({
      clubUuid: club.uuid,
      client_uuid: self.crypto.randomUUID(), // Regla Vyne: UUID generado en el cliente
      name,
      description
    }, {
      onSuccess: () => {
        setHasChanges(false);
        setToast("✓ Cambios del servidor guardados con éxito.");
        setTimeout(() => setToast(null), 3000);
      }
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setHasChanges(e.target.value !== club?.name);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setHasChanges(e.target.value !== club?.description);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-forest-light mb-1">Perfil de servidor</h2>
        <p className="text-sm text-forest-muted">
          Personaliza cómo aparece tu servidor en los enlaces de invitación y en los mensajes de descubrimiento.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formularios Izquierda */}
        <div className="flex-1 flex flex-col gap-6">
          <SettingsInput
            label="Nombre"
            value={name}
            onChange={handleNameChange}
            placeholder="Nombre del servidor"
            disabled={isPending}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest uppercase text-forest-muted">
              Ícono
            </label>
            <p className="text-xs text-forest-muted mb-2">Te recomendamos una imagen de al menos 512x512.</p>
            <div>
              <SettingsButton variant="primary" disabled={isPending}>
                Cambiar ícono del servidor
              </SettingsButton>
            </div>
          </div>

          <div className="bg-forest-border/60 h-px w-full my-2" />

          <SettingsInput
            label="Descripción del servidor"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Escribe una pequeña descripción"
            disabled={isPending}
          />
        </div>

        {/* Mini Preview Derecha */}
        <ClubPreviewCard club={club} name={name} />
      </div>

      {/* Floating Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-0 right-0 bg-forest-stat border border-forest-border rounded-lg p-3 flex items-center justify-between shadow-btn-glow z-10"
          >
            <span className="text-sm font-medium text-forest-light px-2">
              ¡Cuidado! Tienes cambios sin guardar.
            </span>
            <div className="flex gap-2">
              <SettingsButton variant="secondary" onClick={handleReset} disabled={isPending}>
                Restablecer
              </SettingsButton>
              <SettingsButton 
                variant="primary" 
                onClick={handleSave} 
                disabled={isPending}
                className="min-w-[140px] flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </SettingsButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast de Confirmación */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-forest-card border border-forest-accent/40 text-forest-accent text-sm font-bold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 z-9999999 whitespace-nowrap"
          >
            <CheckCircle size={16} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
