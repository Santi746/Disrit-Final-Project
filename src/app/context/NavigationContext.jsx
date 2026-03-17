"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

/**
 * @provider NavigationProvider
 * @description Proveedor que envuelve la app para compartir el estado del Sidebar de clubes.
 */
export function NavigationProvider({ children }) {
  const [isClubOpen, setIsClubOpen] = useState(false);

  const toggleClub = () => setIsClubOpen(!isClubOpen);

  return (
    <NavigationContext.Provider value={{ isClubOpen, toggleClub }}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * @hook useNavigation
 * @description Hook sencillo para usar el contexto en cualquier componente.
 */
export function useNavigation() {
  const context = useContext(NavigationContext);

  return context;
}
