/**
 * @data messageActionItems
 * @description Datos del menú contextual de mensajes (Reply, Copy, Report).
 * Sigue el patrón data-driven (Anti-Hardcoding) del proyecto.
 */
export const messageActionItems = [
  {
    uuid: "reply",
    label: "Responder mensajes",
    iconPath: "M9 13L5 9L9 5 M5 9H13C17.4183 9 21 12.5817 21 17V19",
    type: "neutral",
    styles: {
      text: "text-forest-muted-alt",
      hoverText: "group-hover:text-forest-light",
      icon: "text-forest-muted-alt",
      hoverBg: "hover:bg-forest-deep",
    },
  },
  {
    uuid: "copy",
    label: "Copiar texto",
    iconPath:
      "M16 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z M8 4V2 M12 4V2 M22 8V20C22 21.1046 21.1046 22 20 22H8",
    type: "neutral",
    styles: {
      text: "text-forest-muted-alt",
      hoverText: "group-hover:text-forest-light",
      icon: "text-forest-muted-alt",
      hoverBg: "hover:bg-forest-deep",
    },
  },
  {
    uuid: "report",
    label: "Denunciar Mensaje",
    iconPath:
      "M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V15Z M4 22V15",
    type: "danger",
    styles: {
      text: "text-forest-danger",
      hoverText: "group-hover:text-forest-danger",
      icon: "text-forest-danger",
      hoverBg: "hover:bg-forest-danger-muted",
    },
  },
];
