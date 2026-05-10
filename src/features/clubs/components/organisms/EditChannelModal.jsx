"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import { X, Hash, Volume2, Megaphone, Trash2 } from "lucide-react";
import ModalOverlay from "@/shared/components/ui/atoms/ModalOverlay";
import ModalShell from "@/shared/components/ui/atoms/ModalShell";
import { useMutateEditChannel } from "@/features/clubs/hooks/useMutateEditChannel";
import { useClub } from "@/features/clubs/hooks/useClub";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useQueryString } from "@/shared/hooks/useQueryString";

/**
 * Tipos de canal disponibles (mismos que en CreateChannelModal).
 */
const CHANNEL_TYPES = [
  { value: "text", label: "Texto", icon: Hash },
  { value: "voice", label: "Voz", icon: Volume2 },
  { value: "announcement", label: "Anuncios", icon: Megaphone },
];

/**
 * @component EditChannelModal (Organism)
 * @description Modal para editar o eliminar un canal existente.
 * Se abre cuando `?edit_channel=[channel_uuid]` está en los searchParams.
 * Requiere `?edit_channel_cat=[category_uuid]` para saber la categoría padre.
 *
 * Funciones:
 *   - Editar nombre, tipo y privacidad del canal.
 *   - Eliminar el canal con confirmación.
 *
 * Precarga valores desde la caché del club.
 * Respeta Regla #2 (UUID Cliente) y Regla #3 (Anatomía de useMutation).
 */
export default function EditChannelModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const { createQueryString } = useQueryString();
  const channelUuid = searchParams.get("edit_channel");
  const categoryUuid = searchParams.get("edit_channel_cat");
  const isOpen = !!channelUuid && !!categoryUuid;

  const clubUuid = params.uuid;
  const { data: club } = useClub(clubUuid);
  const editChannelMutation = useMutateEditChannel(clubUuid);

  // ── Estado local de formulario ──
  const [name, setName] = useState("");
  const [channelType, setChannelType] = useState("text");
  const [isPrivate, setIsPrivate] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /** Precarga valores del canal desde la caché del club */
  useEffect(() => {
    if (isOpen && club) {
      const category = club.categories?.find((c) => c.uuid === categoryUuid);
      const channel = category?.channels?.find((ch) => ch.uuid === channelUuid);
      if (channel) {
        setName(channel.name || "");
        setChannelType(channel.type || "text");
        setIsPrivate(!!channel.is_private);
      }
    }
  }, [isOpen, club, channelUuid, categoryUuid]);

  /** URL de cierre */
  const closeHref = createQueryString({
    edit_channel: null,
    edit_channel_cat: null,
  });

  /** Cierra el modal y limpia estado */
  const handleClose = useCallback(() => {
    setName("");
    setChannelType("text");
    setIsPrivate(false);
    setShowDeleteConfirm(false);
    router.push(closeHref);
  }, [closeHref, router]);

  /** Validación */
  const isValid = name.trim().length > 0;

  /** Envía la mutación de edición */
  const handleSave = () => {
    if (!isValid || editChannelMutation.isPending) return;

    editChannelMutation.mutate(
      {
        client_uuid: generateClientUUID(),
        channel_uuid: channelUuid,
        category_uuid: categoryUuid,
        action: "update",
        name: name.trim(),
        type: channelType,
        is_private: isPrivate,
      },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  /** Envía la mutación de eliminación */
  const handleDelete = () => {
    if (editChannelMutation.isPending) return;

    editChannelMutation.mutate(
      {
        client_uuid: generateClientUUID(),
        channel_uuid: channelUuid,
        category_uuid: categoryUuid,
        action: "delete",
      },
      {
        onSuccess: () => handleClose(),
      }
    );
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <ModalShell>
        {/* ── Cabecera ── */}
        <div className="flex items-center justify-between border-b border-forest-border px-6 py-4">
          <h2 className="text-lg font-bold text-forest-light tracking-tight">
            Editar Canal
          </h2>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-forest-muted transition-all hover:bg-forest-stat hover:text-forest-light"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Cuerpo ── */}
        <div className="flex flex-col gap-5 px-6 py-5">
          {/* ── Tipo de Canal ── */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
              Tipo de Canal
            </label>
            <div className="flex flex-col gap-1.5">
              {CHANNEL_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = channelType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setChannelType(type.value)}
                    className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2.5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-forest-accent bg-forest-accent/10"
                        : "border-forest-border bg-forest-stat/40 hover:border-forest-accent/30"
                    }`}
                  >
                    {/* Radio circle */}
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isSelected ? "border-forest-accent" : "border-forest-muted"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-forest-accent" />
                      )}
                    </div>
                    <Icon
                      size={16}
                      className={isSelected ? "text-forest-accent" : "text-forest-muted-alt"}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        isSelected ? "text-forest-light" : "text-forest-muted-alt"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Nombre ── */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
              Nombre del Canal
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del canal"
              maxLength={40}
              className="w-full rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
            />
          </div>

          {/* ── Privacidad ── */}
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-forest-border bg-forest-stat/40 px-4 py-3 transition-colors hover:border-forest-accent/30">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-forest-border accent-forest-accent"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-forest-light">
                Canal privado
              </span>
              <span className="text-xs text-forest-muted">
                Solo los miembros con permisos podrán acceder.
              </span>
            </div>
          </label>

          {/* ── Botón Guardar ── */}
          <button
            onClick={handleSave}
            disabled={!isValid || editChannelMutation.isPending}
            className={`w-full cursor-pointer rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
              isValid && !editChannelMutation.isPending
                ? "bg-forest-accent text-black shadow-btn-glow hover:shadow-btn-glow-hover hover:brightness-110 active:scale-98"
                : "cursor-not-allowed bg-forest-stat text-forest-muted"
            }`}
          >
            {editChannelMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest-muted border-t-transparent" />
                Guardando...
              </span>
            ) : (
              "Guardar Cambios"
            )}
          </button>

          {/* ── Separador ── */}
          <div className="h-px w-full bg-forest-border/40" />

          {/* ── Zona de Peligro: Eliminar Canal ── */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-forest-danger/30 bg-forest-danger-muted px-4 py-3 text-sm font-bold text-forest-danger transition-all hover:border-forest-danger/60 hover:bg-forest-danger/20"
            >
              <Trash2 size={16} />
              Eliminar Canal
            </button>
          ) : (
            <div className="flex flex-col gap-2 rounded-xl border border-forest-danger/40 bg-forest-danger-muted p-4">
              <p className="text-sm font-semibold text-forest-danger">
                ¿Estás seguro? Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={editChannelMutation.isPending}
                  className="flex-1 cursor-pointer rounded-lg bg-forest-danger py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-98"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 cursor-pointer rounded-lg border border-forest-border bg-forest-stat py-2 text-sm font-semibold text-forest-muted transition-all hover:text-forest-light"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </ModalShell>
    </ModalOverlay>
  );
}
