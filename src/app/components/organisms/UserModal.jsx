"use client";

import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { mockModalUser } from "@/app/data/users/userModalData";
import useBreakpointValue from "@/app/hooks/useBreakpointValue";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";

/**
 * @component UserModal
 * @description Modal de inspección de perfil de usuario estilo "Quick View".
 * Muestra la información esencial del usuario sin abandonar la vista actual.
 * Consume un DTO público (ModalUserDTO) que ya viene formateado desde el view model.
 *
 * @param {Object} [props]
 * @param {import("@/app/data/users/userModalData").ModalUserDTO} [props.usuario] - DTO del usuario.
 * @returns {JSX.Element} El modal de perfil de usuario.
 */
export default function UserModal({
  usuario: {
    banner,
    avatar,
    display_name,
    handle,
    bio,
    location,
    joined_date,
    is_online,
    friends,
    clubs,
    mutual_friends_count,
  } = mockModalUser,
}) {
  const maxFriendsVisible = 5;

  /** En pantallas <=375px mostramos 2 clubes para reducir la altura del modal */
  const maxClubsVisible = useBreakpointValue([{ maxWidth: 375, value: 2 }], 3);

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-forest-deep border-forest-border my-auto w-full max-w-[360px] overflow-hidden rounded-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:max-w-[420px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* ── Banner + Botón Cerrar ── */}
        <div className="relative h-28 w-full overflow-hidden">
          <img
            src={banner}
            alt="Banner de perfil"
            className="h-full w-full object-cover"
          />
          <div className="to-forest-deep/90 absolute inset-0 bg-linear-to-b from-transparent" />
          <button
            className="bg-forest-dark/60 border-forest-border/50 text-forest-muted hover:bg-forest-dark absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-all hover:text-white"
            aria-label="Cerrar modal"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* ── Avatar con Estado ── */}
        <div className="relative -mt-10 px-5">
          <div className="relative h-[72px] w-[72px]">
            <div className="border-forest-deep bg-forest-card h-full w-full overflow-hidden rounded-full border-[3px]">
              <img
                src={avatar}
                alt={`Avatar de ${display_name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className={`border-forest-deep absolute right-0.5 bottom-0.5 h-4 w-4 rounded-full border-[2.5px] ${is_online ? "bg-forest-accent" : "bg-forest-muted"}`}
            />
          </div>
        </div>

        {/* ── Información Principal ── */}
        <div className="flex flex-col gap-4 px-5 pt-3 pb-4">
          {/* Nombre y Handle */}
          <div>
            <h2 className="text-forest-light text-lg font-bold tracking-tight">
              {display_name}
            </h2>
            <p className="text-forest-muted text-[13px] font-medium">
              {handle}
            </p>
          </div>
          {/* Biografía */}
          <p className="text-forest-muted-alt text-[13.5px] leading-relaxed">
            {bio}
          </p>

          {/* Ubicación y Fecha */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge variant="custom" className="text-forest-muted bg-forest-stat border-forest-border-faint flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[12px]">
              <FiMapPin size={12} className="text-forest-accent" />
              {location}
            </Badge>
            <Badge variant="custom" className="text-forest-muted bg-forest-stat border-forest-border-faint flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[12px]">
              <FiCalendar size={12} className="text-forest-accent" />
              {joined_date}
            </Badge>
          </div>

          <div className="bg-forest-border/60 h-px w-full" />

          {/* ── Amigos ── */}
          <div className="flex flex-col gap-2">
            <h3 className="text-forest-muted text-[11px] font-bold tracking-wider uppercase">
              Amigos
            </h3>
            <div className="flex items-center">
              {friends.slice(0, maxFriendsVisible).map((friend, i) => (
                <div
                  key={friend.uuid || friend.display_name}
                  title={friend.display_name}
                  style={{ zIndex: 10 - i }}
                  className={`bg-forest-card border-forest-deep overflow-hidden hover:border-forest-accent/50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all hover:z-20 ${i > 0 ? "-ml-2" : ""}`}
                >
                  <img 
                    src={friend.avatar} 
                    alt={friend.display_name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {friends.length > maxFriendsVisible && (
                <div
                  className="bg-forest-stat border-forest-deep text-forest-accent -ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                  style={{ zIndex: 4 }}
                >
                  +{friends.length - maxFriendsVisible}
                </div>
              )}
            </div>
            {mutual_friends_count > 0 && (
              <p className="text-forest-muted text-[11px]">
                Tienen {mutual_friends_count} amigos en común
              </p>
            )}
          </div>

          {/* ── Clubes ── */}
          <div className="flex flex-col gap-2">
            <h3 className="text-forest-muted text-[11px] font-bold tracking-wider uppercase">
              Clubes
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {clubs.slice(0, maxClubsVisible).map((club) => (
                <div
                  key={club.name}
                  className="bg-forest-stat border-forest-border-faint hover:border-forest-accent/40 flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 transition-all sm:gap-1.5 sm:px-2.5 sm:py-1.5"
                >
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="h-4 w-4 rounded-full object-cover sm:h-5 sm:w-5"
                  />
                  <span className="text-forest-light text-[11px] font-semibold sm:text-[12px]">
                    {club.name}
                  </span>
                </div>
              ))}
              {clubs.length > maxClubsVisible && (
                <div className="bg-forest-stat border-forest-border-faint text-forest-accent hover:border-forest-accent/40 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border text-[10px] font-bold transition-all sm:h-8 sm:w-8">
                  +{clubs.length - maxClubsVisible}
                </div>
              )}
            </div>
          </div>

          <div className="bg-forest-border/60 h-px w-full" />

          {/* ── Botones de Acción ── */}
          <div className="flex items-center gap-3">
            <Button variant="custom" className="bg-forest-accent hover:bg-forest-accent-mid flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold text-black transition-colors">
              <FiMessageSquare size={15} />
              Mensaje
            </Button>
            <Button variant="custom" className="bg-forest-stat border-forest-border text-forest-light hover:border-forest-accent/50 hover:text-forest-accent flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-[13px] font-bold transition-all">
              <FiUserPlus size={15} />
              Añadir Amigo
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
