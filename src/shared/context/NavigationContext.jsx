"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

/**
 * Context provider que gestiona el estado de apertura del sidebar de clubes.
 * Controla la expansión/contraacción del panel lateral de clubs y permite
 * que cualquier componente hijko pueda togglear este estado.
 *
 * @provider NavigationProvider
 * @param {Object} props - Propiedades del provider.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element}
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
 * Hook para acceder al estado y acciones del sidebar de clubes.
 * @hook useNavigation
 * @returns {{ isClubOpen: boolean, toggleClub: Function }} Estado del club y función para togglear.
 */
export function useNavigation() {
  const context = useContext(NavigationContext);

  return context;
}
