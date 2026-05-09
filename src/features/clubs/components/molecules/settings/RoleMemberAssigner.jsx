import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";

export default function RoleMemberAssigner({
  selectedRole,
  searchTerm,
  setSearchTerm,
  isPending,
  filteredUsers,
  handleAssignRole,
}) {
  return (
    <div className="bg-forest-card border border-forest-border rounded-xl p-6 flex flex-col">
      <h3 className="text-sm font-bold text-forest-light mb-4 flex items-center gap-2">
        Asignar <span style={{ color: selectedRole.color }}>{selectedRole.name}</span> a Miembros
      </h3>
      
      <SettingsInput
        placeholder="Buscar miembros..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        rightElement={<Search size={16} className="text-forest-muted" />}
      />

      <div className="mt-4 flex flex-col gap-2 overflow-y-auto max-h-60 no-scrollbar">
        <AnimatePresence>
          {isPending ? (
            // Carga de usuarios para asignar roles
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-stat"></div>
                  <div className="w-24 h-3 bg-forest-stat rounded"></div>
                </div>
              </div>
            ))
          ) : filteredUsers.length === 0 ? (
            <div className="text-center text-forest-muted text-sm py-4">No se encontraron miembros.</div>
          ) : (
            filteredUsers.map(user => (
              <motion.div
                key={user.uuid}
                layout
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: "hidden" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-between p-2 rounded hover:bg-forest-stat group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar
                    uuid={user.uuid}
                    avatar_url={user.avatar_url}
                    display_name={user.display_name}
                    size="sm"
                  />
                  <span className="text-forest-light text-sm font-medium">{user.display_name}</span>
                </div>
                <button
                  onClick={() => handleAssignRole(user.uuid, user.display_name)}
                  className="py-1 px-3 text-xs rounded opacity-0 group-hover:opacity-100 border border-forest-accent/50 text-forest-accent bg-forest-accent/10 hover:bg-forest-accent hover:text-black font-bold transition-all"
                >
                  Añadir
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
