import { FiSearch, FiUsers, FiHash } from "react-icons/fi";

/**
 * Array de datos estáticos que define los filtros de búsqueda disponibles.
 * Contiene identificadores, etiquetas para el usuario y sus componentes de React (íconos).
 * 
 * @type {Array<{uuid: string, label: string, icon: JSX.Element}>}
 */
export const searchFiltersData = [
    { uuid: "all", label: "All", icon: <FiSearch size={16} /> },
    { uuid: "users", label: "Users", icon: <FiUsers size={16} /> },
    { uuid: "clubs", label: "Clubs", icon: <FiHash size={16} /> }
];
