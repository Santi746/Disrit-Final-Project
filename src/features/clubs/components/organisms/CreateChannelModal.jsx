"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import { X, Hash, Volume2, Megaphone } from "lucide-react";
import ModalOverlay from "@/shared/components/ui/atoms/ModalOverlay";
import ModalShell from "@/shared/components/ui/atoms/ModalShell";
import { useMutateCreateChannel } from "@/features/clubs/hooks/useMutateCreateChannel";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useQueryString } from "@/shared/hooks/useQueryString";

/**
 * Tipos de canal disponibles con sus metadatos visuales.
 * @type {Array<{value: string, label: string, icon: React.ComponentType, description: string}>}
 */
const CHANNEL_TYPES = [
  {
    value: "text",
    label: "Texto",
    icon: Hash,
    description: "Enviar mensajes, imágenes, GIFs y más.",
  },
  {
    value: "voice",
    label: "Voz",
    icon: Volume2,
    description: "Chatea por voz y video con tu comunidad.",
  },
  {
    value: "announcement",
    label: "Anuncios",
    icon: Megaphone,
    description: "Publicaciones importantes para tu club.",
  },
];

/**
 * @component CreateChannelModal (Organism)
 * @description Modal para crear un nuevo canal dentro de una categoría.
 * Se abre cuando `?create_channel=[category_uuid]` está en los searchParams.
 *
 * Campos:
 *   - Tipo de canal (radio buttons circulares).
 *   - Nombre del canal (obligatorio).
 *   - Privacidad (checkbox).
 *
 * Respeta Regla #2 Vyne (UUID Cliente) y Regla #3 (Anatomía de useMutation).
 */
export default function CreateChannelModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const { createQueryString } = useQueryString();
  const categoryUuid = searchParams.get("create_channel");
  const isOpen = !!categoryUuid;

  // ── Estado local de formulario (UI local, NO data del servidor) ──
  const [channelType, setChannelType] = useState("text");
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const clubUuid = params.uuid;
  const createChannelMutation = useMutateCreateChannel(clubUuid);

  /** URL de cierre */
  const closeHref = createQueryString("create_channel", null);

  /** Cierra el modal y limpia estado */
  const handleClose = useCallback(() => {
    setChannelType("text");
    setName("");
    setIsPrivate(false);
    router.push(closeHref);
  }, [closeHref, router]);

  /** Validación: nombre no vacío */
  const isValid = name.trim().length > 0;

  /** Envía la mutación con UUID cliente */
  const handleCreate = () => {
    if (!isValid || createChannelMutation.isPending) return;

    const client_uuid = generateClientUUID();

    createChannelMutation.mutate(
      {
        client_uuid,
        category_uuid: categoryUuid,
        name: name.trim(),
        type: channelType,
        is_private: isPrivate,
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
            Crear Canal
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
          {/* ── Tipo de Canal (Radio Buttons Circulares) ── */}
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
                    className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-forest-accent bg-forest-accent/10"
                        : "border-forest-border bg-forest-stat/40 hover:border-forest-accent/30"
                    }`}
                  >
                    {/* Radio circle */}
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isSelected
                          ? "border-forest-accent"
                          : "border-forest-muted"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-forest-accent" />
                      )}
                    </div>
                    {/* Icon */}
                    <Icon
                      size={18}
                      className={`shrink-0 ${
                        isSelected ? "text-forest-accent" : "text-forest-muted-alt"
                      }`}
                    />
                    {/* Text */}
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected ? "text-forest-light" : "text-forest-muted-alt"
                        }`}
                      >
                        {type.label}
                      </span>
                      <span className="text-xs text-forest-muted">
                        {type.description}
                      </span>
                    </div>
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
              placeholder="Ej: chat-general"
              maxLength={40}
              className="w-full rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
              autoFocus
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

          {/* ── Botón Crear ── */}
          <button
            onClick={handleCreate}
            disabled={!isValid || createChannelMutation.isPending}
            className={`w-full cursor-pointer rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
              isValid && !createChannelMutation.isPending
                ? "bg-forest-accent text-black shadow-btn-glow hover:shadow-btn-glow-hover hover:brightness-110 active:scale-98"
                : "cursor-not-allowed bg-forest-stat text-forest-muted"
            }`}
          >
            {createChannelMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest-muted border-t-transparent" />
                Creando...
              </span>
            ) : (
              "Crear Canal"
            )}
          </button>
        </div>
      </ModalShell>
    </ModalOverlay>
  );
}
