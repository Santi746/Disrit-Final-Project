"use client";

import { FiUsers } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

/**
 * @molecule FriendsNavItem
 * @description Botón de navegación "Amigos" en la sidebar de Mensajes Directos.
 * Visualmente idéntico al botón de "Amigos" de Discord en la sidebar izquierda.
 *
 * @param {Object} props
 * @param {number} [props.pendingCount=0] - Cantidad de solicitudes pendientes.
 */
export default function FriendsNavItem({ pendingCount = 0 }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === "/me";

  const handleClick = () => {
    router.push("/me");
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-150 cursor-pointer ${
        isActive
          ? "bg-forest-stat text-forest-light"
          : "text-forest-muted hover:bg-forest-stat/60 hover:text-forest-light"
      }`}
    >
      <FiUsers size={20} className="shrink-0" />
      <span className="text-sm font-semibold">Amigos</span>

      {/* Badge de solicitudes pendientes */}
      {pendingCount > 0 && (
        <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-danger px-1 text-[10px] font-bold text-white">
          {pendingCount}
        </span>
      )}
    </button>
  );
}
