import { memo } from "react";

/**
 * @molecule ReplyBanner
 * @description Banner que aparece encima del input de chat indicando que se está escribiendo una respuesta.
 *
 * @param {Object} props
 * @param {string} props.username - Nombre del usuario al que se le va a responder.
 * @param {Function} props.onClose - Función para cancelar la respuesta.
 */
export default memo(function ReplyBanner({ username, onClose }) {
  return (
    <div className="bg-forest-stat border-forest-border z-0 flex items-center justify-between rounded-t-xl border-x border-t px-3 py-2 text-sm">
      <div className="text-forest-muted flex items-center gap-1.5">
        <span>Respondiendo a</span>
        <span className="text-forest-light font-bold">@{username}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-forest-muted hover:text-forest-light transition-colors"
        aria-label="Cancelar respuesta"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
});
