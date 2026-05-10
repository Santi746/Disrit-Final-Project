import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Función auxiliar para aplicar el tema seleccionado al elemento raíz del documento.
 * 
 * @param {string} theme - El identificador del tema (ej., 'forest', 'classic').
 */
const applyThemeToDOM = (theme) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme || "forest");
  }
};

/**
 * useSettingsStore es una tienda de Zustand que gestiona la configuración global de la aplicación,
 * como el tema de la interfaz y las preferencias de diseño. Soporta persistencia
 * usando localStorage e incluye un estado "pendiente" para previsualizar cambios.
 * 
 * @typedef {Object} SettingsState
 * @property {string} theme - El tema de la interfaz activo.
 * @property {string} clubSidebarLayout - Configuración de diseño para la barra lateral del club ('bottom', etc.).
 * @property {string|null} pendingTheme - Tema que se está previsualizando actualmente pero aún no se ha guardado.
 * @property {string|null} pendingLayout - Diseño que se está previsualizando actualmente pero aún no se ha guardado.
 * @property {Function} setPendingTheme - Actualiza el tema pendiente.
 * @property {Function} setPendingLayout - Actualiza el diseño pendiente.
 * @property {Function} applySettings - Confirma los cambios pendientes en el estado persistente y los aplica al DOM.
 * @property {Function} resetPending - Limpia todos los cambios no guardados.
 * @property {Function} initTheme - Inicializa el DOM con el tema guardado actualmente.
 */
export const useSettingsStore = create(


  persist(
    (set, get) => ({
      // Estado Persistido
      theme: "forest",
      clubSidebarLayout: "bottom",

      // Estado Temporal (no persistido, para la previsualización/edición antes de guardar)
      pendingTheme: null,
      pendingLayout: null,

      // Acciones
      setPendingTheme: (theme) => set({ pendingTheme: theme }),
      setPendingLayout: (layout) => set({ pendingLayout: layout }),

      applySettings: () => {
        const { pendingTheme, pendingLayout, theme, clubSidebarLayout } = get();
        const newTheme = pendingTheme || theme;
        const newLayout = pendingLayout || clubSidebarLayout;

        set({
          theme: newTheme,
          clubSidebarLayout: newLayout,
          pendingTheme: null,
          pendingLayout: null,
        });

        applyThemeToDOM(newTheme);
      },

      resetPending: () => {
        set({ pendingTheme: null, pendingLayout: null });
      },

      // Inicializador para aplicar el tema guardado al cargar la app
      initTheme: () => {
        const { theme } = get();
        applyThemeToDOM(theme);
      },
    }),
    {
      name: "vyne-settings",
      // No persistimos los estados pendientes
      partialize: (state) => ({
        theme: state.theme,
        clubSidebarLayout: state.clubSidebarLayout,
      }),
    }
  )
);
