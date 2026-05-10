import { memo } from "react";

/**
 * @atom ReplyReference
 * @description Indicador visual de que un mensaje es una respuesta a otro.
 * Muestra una pequeña línea (L), el nombre del usuario al que se responde y un fragmento del mensaje.
 *
 * @param {Object} props
 * @param {string} props.username - Nombre del usuario al que se está respondiendo.
 * @param {string} props.content - Fragmento (truncate) del mensaje original.
 * @param {Function} [props.onClick] - Acción al hacer clic (ej. scrollear al mensaje original).
 */
export default memo(function ReplyReference({ username, content, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative mb-1 flex cursor-pointer select-none items-center gap-1.5 pl-10 opacity-70 transition-opacity hover:opacity-100"
      role="button"
      aria-label={`Respuesta al mensaje de ${username}`}
    >
      {/* Línea en forma de L */}
      <div className="border-forest-border absolute left-4 top-1/2 h-3 w-4 rounded-tl-md border-l-2 border-t-2"></div>
      
      {/* Nombre del usuario */}
      <span className="text-forest-light text-xs font-bold hover:underline">
        @{username}
      </span>
      
      {/* Fragmento del mensaje */}
      <span className="text-forest-muted max-w-[60%] truncate text-xs sm:max-w-md">
        {content}
      </span>
    </div>
  );
});
