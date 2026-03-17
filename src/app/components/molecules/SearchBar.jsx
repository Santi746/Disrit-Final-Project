"use client";

import { Search } from "lucide-react";

/**
 * Componente SearchBar para consultas del usuario. Ajusta el estado de búsqueda dinámicamente según la longitud.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setIsSearching - Función del estado para alternar el modo de búsqueda en el padre.
 * @returns {JSX.Element} El campo de entrada SearchBar.
 */
export default function SearchBar({ setIsSearching }) {
  return (
    <div className="w-full px-2">
      <div className="relative flex w-full items-center">
        <div className="text-forest-muted absolute left-4">
          <Search width="18" height="18" strokeWidth="2" />
        </div>
        <input
          onChange={(e) => {
            const text = e.target.value;

            if (text.length > 5) {
              setIsSearching(true);
            } else {
              setIsSearching(false);
            }
          }}
          type="text"
          placeholder="Search clubs, topics, or interests..."
          className="border-forest-border text-forest-light placeholder-forest-placeholder bg-forest-dark-alt focus:border-forest-accent/60 w-full rounded-md border py-3.5 pr-4 pl-[46px] text-[15px] transition-colors focus:outline-none"
        />
      </div>
    </div>
  );
}
