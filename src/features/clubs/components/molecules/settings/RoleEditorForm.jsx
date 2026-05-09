import React from "react";
import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";

export default function RoleEditorForm({
  selectedRole,
  handleUpdateRoleName,
  handleUpdateRoleColor,
}) {
  return (
    <div className="bg-forest-card border border-forest-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedRole.color }} />
        <h2 className="text-lg font-bold text-forest-light" style={{ color: selectedRole.color }}>
          {selectedRole.name}
        </h2>
        {selectedRole.is_fixed && (
          <span className="bg-forest-accent/20 text-forest-accent text-xs font-bold px-2 py-0.5 rounded uppercase ml-auto">
            Rol Fijo
          </span>
        )}
      </div>
      
      <div className="flex flex-col gap-4">
        <SettingsInput
          label="Nombre del Rol"
          value={selectedRole.name}
          onChange={(e) => handleUpdateRoleName(e.target.value)}
          disabled={selectedRole.is_fixed}
        />
        <div>
          <label className="text-xs font-bold tracking-widest uppercase text-forest-muted mb-2 block">
            Color del Rol
          </label>
          <div className="flex items-center gap-3 relative">
            <div 
              className="w-10 h-10 rounded-lg border-2 border-forest-border flex items-center justify-center cursor-pointer relative overflow-hidden" 
              style={{ backgroundColor: selectedRole.color }}
            >
              {!selectedRole.is_fixed && (
                <input 
                  type="color" 
                  value={selectedRole.color}
                  onChange={(e) => handleUpdateRoleColor(e.target.value)}
                  className="absolute inset-[-10px] w-20 h-20 opacity-0 cursor-pointer"
                />
              )}
            </div>
            <span className="text-forest-muted-alt text-sm">
              {selectedRole.is_fixed 
                ? "Los roles fijos no pueden modificar su color." 
                : "Haz clic en el recuadro para seleccionar un color personalizado."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
