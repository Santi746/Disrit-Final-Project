import SettingsInput from "@/shared/components/ui/atoms/SettingsInput";
import Toggle from "@/shared/components/ui/atoms/Toggle";
import { PERMISSIONS, PERMISSION_GROUPS, hasPermission } from "@/shared/constants/permissions";
import { Loader2 } from "lucide-react";

/**
 * @component RoleEditorForm
 * @description Interfaz para editar nombre, color y permisos bitwise de un rol.
 */
export default function RoleEditorForm({
  selectedRole,
  isSaving,
  handleUpdateRoleName,
  handleUpdateRoleColor,
  handleTogglePermission, 
}) {
  const isOwnerRole = hasPermission(selectedRole.permissions, PERMISSIONS.ADMINISTRATOR);

  return (
    <div className="flex flex-col gap-6">
      {/* ── DATOS BÁSICOS ── */}
      <div className="bg-forest-card border border-forest-border rounded-xl p-6 relative">
        {/* Indicador de Sincronización (Feedback de Debouncing) */}
        {isSaving && (
          <div className="absolute top-4 right-6 flex items-center gap-2 text-forest-accent animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sincronizando...</span>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <span className="w-4 h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: selectedRole.color }} />
          <h2 className="text-lg font-black text-forest-light tracking-tight">
            {selectedRole.name}
          </h2>
          {selectedRole.is_fixed && (
            <span className="bg-forest-stat/40 text-forest-light text-[10px] font-black px-2 py-0.5 rounded uppercase ml-auto tracking-widest border border-forest-border/50">
              Sistema
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-5">
          <SettingsInput
            label="Nombre del Rol"
            value={selectedRole.name}
            onChange={(e) => handleUpdateRoleName(e.target.value)}
            disabled={selectedRole.is_fixed}
          />
          <div>
            <label className="text-[11px] font-black tracking-widest uppercase text-forest-muted/60 mb-2 block">
              Color del Rol
            </label>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl border-2 border-forest-border flex items-center justify-center cursor-pointer relative overflow-hidden transition-transform active:scale-95 shadow-inner" 
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
              <div className="flex flex-col">
                <span className="text-forest-light text-sm font-bold uppercase tracking-wider">
                  {selectedRole.color}
                </span>
                <span className="text-forest-muted text-xs">
                  {selectedRole.is_fixed ? "Color de sistema" : "Selecciona un color personalizado"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PERMISOS (BITWISE) ── */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-forest-muted/80 px-1 mt-4">
          Configuración de Permisos
        </h3>

        {PERMISSION_GROUPS.map((group) => (
          <div key={group.name} className="bg-forest-card border border-forest-border rounded-xl overflow-hidden">
            <div className="bg-forest-stat/20 px-6 py-3 border-b border-forest-border">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-forest-light/80">
                {group.name}
              </h4>
            </div>
            <div className="divide-y divide-forest-border/50">
              {group.permissions.map((perm) => (
                <div key={perm.label} className="px-6 py-4 flex items-center justify-between hover:bg-forest-stat/5 transition-colors group">
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <span className="text-sm font-bold text-forest-light group-hover:text-forest-accent transition-colors">
                      {perm.label}
                    </span>
                    <p className="text-xs text-forest-muted leading-relaxed">
                      {perm.desc}
                    </p>
                  </div>
                  <Toggle 
                    checked={hasPermission(selectedRole.permissions, perm.bit)} 
                    onChange={() => handleTogglePermission(perm.bit)}
                    disabled={isOwnerRole} // Los administradores totales no pueden quitarse permisos por seguridad
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
