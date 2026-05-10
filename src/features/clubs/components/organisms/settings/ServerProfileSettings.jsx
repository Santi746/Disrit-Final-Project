"use client";

/**
 * @file ServerProfileSettings.jsx
 * @description Sección general de los ajustes del club.
 * Refactorizado para cumplir con el estándar Vyne y Atomic Design.
 */

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import SettingsButton from "@/shared/components/ui/atoms/SettingsButton";
import SettingsHeader from "@/shared/components/ui/molecules/SettingsHeader";
import SettingsSection from "@/shared/components/ui/molecules/SettingsSection";
import SettingsStickyFooter from "@/shared/components/ui/molecules/SettingsStickyFooter";
import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

import ClubPreviewCard from "../../molecules/settings/ClubPreviewCard";

export default function ServerProfileSettings({ club }) {
  // Estado para el borrador (draft) del formulario
  const [name, setName] = useState(club?.name || "");
  const [description, setDescription] = useState(club?.description || "");
  const [hasChanges, setHasChanges] = useState(false);

  const { mutate, isPending } = useMutateClub();

  // ── PROTECCIÓN DE PERMISOS (BITWISE) ──
  const canEditProfile = useCheckPermission(club?.uuid, PERMISSIONS.MANAGE_CLUB);

  // Sincronizar si el club cambia externamente
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
    if (!club?.uuid || !canEditProfile) return;

    mutate({
      clubUuid: club.uuid,
      client_uuid: self.crypto.randomUUID(),
      name: name.trim(),
      description: description.trim()
    }, {
      onSuccess: () => {
        setHasChanges(false);
        toast.success("Ajustes del servidor actualizados");
      },
      onError: () => {
        toast.error("Error al actualizar el servidor");
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
    <div className="flex flex-col gap-6 pb-20">
      <SettingsHeader 
        title="Perfil de servidor" 
        description="Personaliza cómo aparece tu servidor en los enlaces de invitación y en los mensajes de descubrimiento." 
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          
          <SettingsSection title="Información Básica">
            <div className="flex flex-col gap-6">
              <SettingsInput
                label="Nombre del servidor"
                value={name}
                onChange={handleNameChange}
                placeholder="Ej: Mi Comunidad"
                disabled={isPending || !canEditProfile}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase text-forest-muted">
                  Ícono
                </label>
                <p className="text-xs text-forest-muted mb-2">Te recomendamos una imagen de al menos 512x512.</p>
                <div>
                  <SettingsButton variant="primary" disabled={isPending || !canEditProfile}>
                    Cambiar ícono
                  </SettingsButton>
                </div>
              </div>

              <SettingsInput
                label="Descripción corta"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Escribe una pequeña descripción"
                disabled={isPending || !canEditProfile}
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Identidad Visual">
             <div className="p-4 rounded-xl border border-forest-border bg-forest-stat/20">
                <p className="text-xs text-forest-muted mb-4 italic">
                  El banner se puede configurar desde la página principal del club para una mejor visualización.
                </p>
                <SettingsButton variant="secondary" disabled={isPending || !canEditProfile}>
                  Cambiar Banner
                </SettingsButton>
             </div>
          </SettingsSection>
        </div>

        {/* Vista previa dinámica */}
        <div className="lg:sticky lg:top-0 h-fit">
          <label className="text-xs font-bold tracking-widest uppercase text-forest-muted mb-3 block">
            Vista Previa
          </label>
          <ClubPreviewCard club={club} name={name} />
        </div>
      </div>

      {/* Footer estandarizado Vyne - Solo se muestra si puede editar */}
      {canEditProfile && (
        <SettingsStickyFooter 
          show={hasChanges}
          onReset={handleReset}
          onSave={handleSave}
          isPending={isPending}
        />
      )}
    </div>
  );
}
