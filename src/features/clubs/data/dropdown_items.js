/**
 * @data clubDropdownItems
 * @description Datos del menú dropdown del club con estilos inyectados (Anti-Hardcoding).
 */
export const clubDropdownItems = [
  {
    uuid: "invite",
    label: "Invitar amigos",
    iconPath: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M20 8v6 M23 11h-6",
    type: "cta",
    styles: {
      text: "text-forest-accent",
      hoverText: "group-hover:text-forest-accent",
      icon: "text-forest-accent",
      hoverBg: "hover:bg-forest-deep",
    },
  },
  {
    uuid: "settings",
    label: "Configuración",
    iconPath: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
    type: "neutral",
    styles: {
      text: "text-forest-muted-alt",
      hoverText: "group-hover:text-forest-light",
      icon: "text-forest-muted-alt",
      hoverBg: "hover:bg-forest-deep",
    },
  },
  {
    uuid: "leave",
    label: "Salir del club",
    iconPath: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
    type: "danger",
    styles: {
      text: "text-forest-danger",
      hoverText: "group-hover:text-forest-danger",
      icon: "text-forest-danger",
      hoverBg: "hover:bg-forest-danger-muted",
    },
  },
];
