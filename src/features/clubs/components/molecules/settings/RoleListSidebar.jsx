import React from "react";
import { ShieldCheck } from "lucide-react";

/**
 * El componente RoleListSidebar muestra una lista de roles y un formulario de creación rápida.
 * Permite seleccionar un rol para editar sus detalles y crear nuevos roles personalizados.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<Object>} props.roles - Array de objetos de rol a mostrar.
 * @param {Object|null} props.selectedRole - El objeto de rol actualmente seleccionado.
 * @param {Function} props.setSelectedRole - Setter para el rol seleccionado.
 * @param {string} props.newRoleName - Valor del estado para el nombre del nuevo rol que se está creando.
 * @param {Function} props.setNewRoleName - Setter para el nombre del nuevo rol.
 * @param {string} props.newRoleColor - Valor del estado para el color del nuevo rol.
 * @param {Function} props.setNewRoleColor - Setter para el color del nuevo rol.
 * @param {Function} props.handleCreateRole - Handler para disparar la creación de un nuevo rol.
 * @returns {JSX.Element}
 */
export default function RoleListSidebar({
  roles,
  selectedRoleUuid,
  setSelectedRoleUuid,
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
            onClick={() => setSelectedRoleUuid(role.uuid)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedRoleUuid === role.uuid 
                ? "bg-forest-accent/10 border border-forest-accent/30" 
                : "hover:bg-forest-stat border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
              <span className={`text-sm font-medium ${selectedRoleUuid === role.uuid ? "text-forest-light" : "text-forest-muted-alt"}`}>
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
          placeholder="Nombre del rol" 
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
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
