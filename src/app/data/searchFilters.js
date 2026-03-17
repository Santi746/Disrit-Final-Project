import { FiSearch, FiUsers, FiHash } from "react-icons/fi";

/**
 * Array de datos estáticos que define los filtros de búsqueda disponibles.
 * Contiene identificadores, etiquetas para el usuario y sus componentes de React (íconos).
 * 
 * @type {Array<{id: string, label: string, icon: JSX.Element}>}
 */
export const searchFiltersData = [
    { id: "all", label: "All", icon: <FiSearch size={16} /> },
    { id: "users", label: "Users", icon: <FiUsers size={16} /> },
    { id: "clubs", label: "Clubs", icon: <FiHash size={16} /> }
];
