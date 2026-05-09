import React from "react";
import { ShieldCheck } from "lucide-react";

export default function RoleListSidebar({
  roles,
  selectedRole,
  setSelectedRole,
  newRoleName,
  setNewRoleName,
  newRoleColor,
  setNewRoleColor,
  handleCreateRole,
}) {
  return (
    <div className="w-full lg:w-64 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest uppercase text-forest-muted">Roles</h3>
      </div>
      
      <div className="flex flex-col gap-1">
        {roles.map((role) => (
          <div 
            key={role.uuid}
            onClick={() => setSelectedRole(role)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedRole?.uuid === role.uuid 
                ? "bg-forest-accent/10 border border-forest-accent/30" 
                : "hover:bg-forest-stat border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
              <span className={`text-sm font-medium ${selectedRole?.uuid === role.uuid ? "text-forest-light" : "text-forest-muted-alt"}`}>
                {role.name}
              </span>
            </div>
            {role.is_fixed && (
              <ShieldCheck size={14} className="text-forest-accent/70" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-forest-border/60 h-px w-full my-2" />

      {/* Creador rápido de Rol */}
      <div className="flex flex-col gap-3 p-3 border border-forest-border border-dashed rounded-lg bg-forest-card/50 hover:bg-forest-card transition-colors">
        <h4 className="text-xs font-bold text-forest-muted uppercase">Crear Rol Personalizado</h4>
        <input 
          type="text" 
          placeholder="Nombre del rol (sin espacios)" 
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value.replace(/\s/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateRole()}
          className="bg-forest-stat border border-forest-border rounded p-1.5 text-xs text-forest-light focus:outline-none focus:border-forest-accent"
        />
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1.5">
            {['#eab308', '#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#ec4899', '#94a3b8'].map(color => (
              <div 
                key={color} 
                onClick={() => setNewRoleColor(color)}
                className={`w-4 h-4 rounded-full cursor-pointer hover:scale-110 transition-transform ${newRoleColor === color ? 'ring-2 ring-forest-light ring-offset-1 ring-offset-forest-card' : ''}`} 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
          <button 
            onClick={handleCreateRole}
            disabled={!newRoleName.trim()}
            className="bg-forest-accent hover:bg-forest-accent-mid text-black font-bold text-[10px] px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            CREAR
          </button>
        </div>
      </div>
    </div>
  );
}
