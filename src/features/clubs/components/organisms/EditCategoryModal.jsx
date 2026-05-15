"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, usePathname, useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import ModalOverlay from "@/shared/components/ui/atoms/ModalOverlay";
import ModalShell from "@/shared/components/ui/atoms/ModalShell";
import { useMutateEditCategory } from "@/features/clubs/hooks/useMutateEditCategory";
import { useClub } from "@/features/clubs/hooks/useClub";
import { useClubCategories } from "@/features/clubs/hooks/useClubCategories";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useQueryString } from "@/shared/hooks/useQueryString";

/**
 * @component EditCategoryModal (Organism)
 * @description Modal para editar el nombre y la privacidad de una categoría existente.
 * Se abre cuando `?edit_category=[category_uuid]` está en los searchParams.
 *
 * Precarga los valores actuales desde la caché del club.
 * Respeta Regla #2 Vyne (UUID Cliente) y Regla #3 (Anatomía de useMutation).
 */
export default function EditCategoryModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const { createQueryString } = useQueryString();
  const categoryUuid = searchParams.get("edit_category");
  const isOpen = !!categoryUuid;

  const clubUuid = params.uuid;
  const { data: club } = useClub(clubUuid);
  const { data: categories } = useClubCategories(clubUuid);
  const editCategoryMutation = useMutateEditCategory(clubUuid);

  // ── Estado local de formulario ──
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (isOpen && club && categories) {
      const category = categories?.find((c) => c.uuid === categoryUuid);
      if (category) {
        setName(category.name || "");
        setIsPrivate(!!category.is_private);
      }
    }
  }, [isOpen, club, categoryUuid]);

  /** URL de cierre */
  const closeHref = createQueryString("edit_category", null);

  /** Cierra el modal y limpia estado */
  const handleClose = useCallback(() => {
    setName("");
    setIsPrivate(false);
    router.push(closeHref);
  }, [closeHref, router]);

  /** Validación */
  const isValid = name.trim().length > 0;

  /** Envía la mutación de edición */
  const handleSave = () => {
    if (!isValid || editCategoryMutation.isPending) return;

    const client_uuid = generateClientUUID();

    editCategoryMutation.mutate(
      {
        client_uuid,
        category_uuid: categoryUuid,
        name: name.trim(),
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
            Editar Categoría
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
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-forest-muted">
              Nombre de la categoría
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la categoría"
              maxLength={40}
              className="w-full rounded-lg border-2 border-forest-border bg-forest-card px-3 py-2.5 text-sm text-forest-light placeholder-forest-placeholder outline-none transition-colors hover:border-forest-border-faint focus:border-forest-accent"
              autoFocus
            />
          </div>

          {/* Privacidad */}
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-forest-border bg-forest-stat/40 px-4 py-3 transition-colors hover:border-forest-accent/30">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-forest-border accent-forest-accent"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-forest-light">
                Categoría privada
              </span>
              <span className="text-xs text-forest-muted">
                Solo los miembros con permisos podrán ver esta categoría.
              </span>
            </div>
          </label>

          {/* Botón Guardar */}
          <button
            onClick={handleSave}
            disabled={!isValid || editCategoryMutation.isPending}
            className={`w-full cursor-pointer rounded-xl py-3 text-sm font-extrabold transition-all duration-300 ${
              isValid && !editCategoryMutation.isPending
                ? "bg-forest-accent text-black shadow-btn-glow hover:shadow-btn-glow-hover hover:brightness-110 active:scale-98"
                : "cursor-not-allowed bg-forest-stat text-forest-muted"
            }`}
          >
            {editCategoryMutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-forest-muted border-t-transparent" />
                Guardando...
              </span>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </ModalShell>
    </ModalOverlay>
  );
}
