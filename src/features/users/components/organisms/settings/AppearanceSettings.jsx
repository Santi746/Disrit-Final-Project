import React, { useEffect } from "react";
import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { FiMonitor, FiSmartphone } from "react-icons/fi";
import SettingsHeader from "@/shared/components/ui/molecules/SettingsHeader";
import SettingsSection from "@/shared/components/ui/molecules/SettingsSection";
import SettingsStickyFooter from "@/shared/components/ui/molecules/SettingsStickyFooter";
import ThemeCard from "../../molecules/ThemeCard";
import LayoutCard from "../../molecules/LayoutCard";

/** @type {Array<{id: string, name: string}>} */
const THEMES = [
  { id: "forest",   name: "Deep Forest" },
  { id: "ocean",    name: "Teal Deep"   },
  { id: "midnight", name: "Midnight"    },
  { id: "dawn",     name: "Dawn"        },
];

/**
 * @component AppearanceSettings
 * @description Panel de personalización visual. Temas y layout del sidebar móvil.
 * Sigue el patrón atómico delegando el renderizado a moléculas.
 */
export default function AppearanceSettings() {
  const {
    theme: activeTheme,
    clubSidebarLayout: activeLayout,
    pendingTheme,
    pendingLayout,
    setPendingTheme,
    setPendingLayout,
    applySettings,
    resetPending,
  } = useSettingsStore();

  const currentTheme = pendingTheme || activeTheme;
  const currentLayout = pendingLayout || activeLayout;
  const hasChanges = pendingTheme !== null || pendingLayout !== null;

  // Cleanup on unmount si no guardó
  useEffect(() => {
    return () => resetPending();
  }, [resetPending]);

  return (
    <div className="flex flex-col gap-8 pb-6 relative">
      <SettingsHeader 
        title="Apariencia" 
        description="Personaliza cómo se ve Vyntra en todos tus dispositivos. Los cambios se aplicarán globalmente." 
      />

      {/* ── Selector de Temas ── */}
      <SettingsSection title="Tema de Colores">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {THEMES.map((t) => (
            <ThemeCard 
              key={t.id} 
              theme={t} 
              isActive={currentTheme === t.id} 
              onClick={() => setPendingTheme(t.id)} 
            />
          ))}
        </div>
      </SettingsSection>

      <div className="bg-forest-border/40 h-px w-full my-2" />

      {/* ── Layout del Sidebar Móvil ── */}
      <SettingsSection 
        title="Posición del Sidebar del Club (Móviles)"
        description="Elige dónde aparece la navegación del servidor en pantallas pequeñas."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LayoutCard
            id="bottom"
            label="Barra Inferior"
            icon={<FiSmartphone size={18} />}
            isActive={currentLayout === "bottom"}
            onClick={setPendingLayout}
            preview={
              <div className="flex flex-col h-full overflow-hidden">
                <div className="h-5 w-full bg-forest-stat border-b border-forest-border" />
                <div className="flex-1 p-2 flex flex-col gap-1.5">
                  <div className="w-2/3 h-1.5 bg-forest-stat rounded-full" />
                  <div className="w-1/2 h-1.5 bg-forest-stat rounded-full" />
                </div>
                <div className="h-7 w-full bg-forest-card border-t border-forest-border flex items-center justify-around px-2">
                  <div className="w-3 h-3 rounded-full bg-forest-muted/50" />
                  <div className="w-3 h-3 rounded-full bg-forest-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-forest-muted/50" />
                </div>
              </div>
            }
          />

          <LayoutCard
            id="vertical"
            label="Panel Lateral"
            icon={<FiMonitor size={18} />}
            isActive={currentLayout === "vertical"}
            onClick={setPendingLayout}
            preview={
              <div className="flex flex-row h-full overflow-hidden">
                <div className="w-7 h-full bg-forest-card border-r border-forest-border flex flex-col items-center py-2 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-forest-muted/50" />
                  <div className="w-3 h-3 rounded-full bg-forest-accent/80" />
                </div>
                <div className="flex-1 flex flex-col h-full">
                  <div className="h-5 w-full bg-forest-stat border-b border-forest-border" />
                  <div className="flex-1 p-2 flex flex-col gap-1.5">
                    <div className="w-2/3 h-1.5 bg-forest-stat rounded-full" />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </SettingsSection>

      <SettingsStickyFooter 
        show={hasChanges} 
        onSave={applySettings} 
        onReset={resetPending} 
      />
    </div>
  );
}
