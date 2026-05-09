"use client";

import React from "react";
import { motion } from "framer-motion";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { FiPlus } from "react-icons/fi";

/**
 * @component UserCard
 * @description Tarjeta premium para mostrar perfiles de usuario en la búsqueda global.
 * 
 * @param {Object} props
 * @param {Object} props.user - Objeto de datos del usuario.
 * @returns {JSX.Element}
 */
export default function UserCard({ user }) {
  if (!user) return null;

  const displayName = user.display_name || (user.first_name ? `${user.first_name} ${user.last_name}` : user.username);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-forest-card/40 border-forest-border/40 hover:border-forest-accent/40 group relative flex flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:bg-forest-card/60 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <UserAvatar
          uuid={user.uuid}
          avatar_url={user.avatar_url}
          display_name={displayName}
          is_online={user.is_online}
          size="lg"
          className="ring-2 ring-transparent group-hover:ring-forest-accent/20"
        />
        
        <button className="bg-forest-dark-alt hover:bg-forest-accent hover:text-black text-forest-light flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200">
          <FiPlus size={18} />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate font-bold text-white group-hover:text-forest-accent transition-colors">
            {displayName}
          </h3>
          <span className="text-forest-muted text-[10px] font-bold uppercase tracking-widest bg-forest-dark-alt px-1.5 py-0.5 rounded border border-forest-border/50">
            {user.category_tag || "#0000"}
          </span>
        </div>
        <p className="text-forest-muted text-xs font-medium">
          @{user.username}
        </p>
      </div>

      {user.bio && (
        <p className="text-forest-muted mt-3 line-clamp-2 text-xs leading-relaxed italic">
          "{user.bio}"
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-forest-border/20 flex items-center justify-between">
        <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 w-5 rounded-full border-2 border-forest-deep bg-forest-dark-alt flex items-center justify-center text-[8px] font-bold text-forest-muted">
                    {i === 2 ? "+2" : ""}
                </div>
            ))}
        </div>
        <span className="text-[10px] font-bold text-forest-muted uppercase tracking-tighter">
            Amigos mutuos
        </span>
      </div>
    </motion.div>
  );
}
