"use client";

/**
 * @molecule FriendsHeader
 * @description Header de la página de amigos con tabs: "En línea", "Todos", "Pendiente", "Añadir amigos".
 * Visualmente idéntico a Discord.
 *
 * @param {Object} props
 * @param {string} props.activeTab - Tab actualmente activo.
 * @param {Function} props.onTabChange - Callback al cambiar de tab.
 * @param {number} [props.pendingCount=0] - Cantidad de solicitudes pendientes.
 */

const TABS = [
  { id: "online", label: "En línea" },
  { id: "all", label: "Todos" },
  { id: "pending", label: "Pendiente" },
];

export default function FriendsHeader({ activeTab, onTabChange, pendingCount = 0 }) {
  return (
    <header className="flex items-center gap-2 h-12 px-4 border-b border-forest-border-faint shadow-lg shadow-forest-accent-dark/18 bg-forest-dark-card shrink-0 overflow-x-auto no-scrollbar">
      {/* Ícono de Amigos */}
      <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-forest-border mr-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest-muted">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
        <span className="text-sm font-bold text-forest-light">Amigos</span>
      </div>

      {/* Tabs de navegación */}
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-forest-stat text-forest-light"
              : "text-forest-muted hover:bg-forest-stat/40 hover:text-forest-light"
          }`}
        >
          {tab.label}
          {/* Badge en Pendiente */}
          {tab.id === "pending" && pendingCount > 0 && (
            <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-forest-danger px-1 text-[10px] font-bold text-white">
              {pendingCount}
            </span>
          )}
        </button>
      ))}

      {/* Botón especial: Añadir Amigos */}
      <button
        onClick={() => onTabChange("add")}
        className={`shrink-0 rounded-md px-3 py-1 text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap ${
          activeTab === "add"
            ? "bg-transparent text-forest-accent"
            : "bg-forest-accent text-forest-dark hover:bg-forest-accent/80"
        }`}
      >
        Añadir amigos
      </button>
    </header>
  );
}
