"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * @component UserAvatar
 * @description Atomo COMPARTIDO reutilizable para mostrar el avatar de cualquier usuario.
 * Al hacer clic abre el UserModal del usuario usando un search param ?user=<uuid>
 * manteniendo el pathname actual (no navega a otra ruta).
 *
 * @location shared/components/ui/atoms — reside en shared porque es utilizado
 * por multiples features (users, chat, clubs), respetando la regla de
 * no dependencias cruzadas entre features.
 *
 * @param {Object}  props
 * @param {string}  props.uuid         - UUID unico del usuario.
 * @param {string}  props.avatar_url   - URL publica del avatar.
 * @param {string}  props.display_name - Nombre completo (accesibilidad alt/title).
 * @param {boolean} [props.is_online]  - Muestra indicador de estado online.
 * @param {string}  [props.size]       - "sm" | "md" | "lg". Default "md".
 * @param {number}  [props.zIndex]     - z-index inline para stacking superpuesto.
 * @param {string}  [props.className]  - Clases extra para el wrapper externo.
 *
 * @returns {JSX.Element}
 */
export default function UserAvatar({
  uuid,
  avatar_url,
  display_name,
  is_online,
  size = "md",
  zIndex,
  className = "",
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sizeMap = {
    sm: "h-8 w-8 sm:h-10 sm:w-10",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const dotSizeMap = {
    sm: "h-2.5 w-2.5 -right-0.5 -bottom-0.5",
    md: "h-3 w-3 right-0 bottom-0",
    lg: "h-4 w-4 right-0.5 bottom-0.5",
  };

  const avatarSize = sizeMap[size] ?? sizeMap.md;
  const dotSize = dotSizeMap[size] ?? dotSizeMap.md;

  const currentParams = new URLSearchParams(Array.from(searchParams?.entries() || []));
  currentParams.delete("preview");
  currentParams.set("user", uuid);
  const href = `${pathname}?${currentParams.toString()}`;

  return (
    <Link
      href={href}
      scroll={false}
      title={display_name}
      style={zIndex !== undefined ? { zIndex } : undefined}
      className={`group relative flex shrink-0 cursor-pointer items-center justify-center transition-all duration-200 hover:z-20 ${avatarSize} ${className}`}
    >
      <div className="h-full w-full overflow-hidden rounded-full border-2 border-transparent transition-all duration-200 group-hover:border-forest-accent/60">
        <img
          src={avatar_url}
          alt={`Avatar de ${display_name}`}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      {is_online !== undefined && (
        <span
          className={`border-forest-deep absolute rounded-full border-2 ${dotSize} ${
            is_online ? "bg-forest-accent" : "bg-forest-muted"
          }`}
        />
      )}
    </Link>
  );
}
