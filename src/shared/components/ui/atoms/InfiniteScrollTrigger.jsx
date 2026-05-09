import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * @atom InfiniteScrollTrigger
 * @description Componente invisible que actúa como sensor de proximidad.
 * Cuando entra en el campo visual del usuario, dispara fetchNextPage UNA SOLA VEZ.
 *
 * @param {Function} onTrigger - Función a ejecutar cuando el componente entra en vista.
 * @param {boolean} hasMore - Indica si hay más datos por cargar.
 * @param {boolean} isLoading - Indica si actualmente se está cargando una página.
 */
const InfiniteScrollTrigger = ({ onTrigger, hasMore, isLoading }) => {
  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        onTrigger();
      }
    },
  });

  if (!hasMore) return null;

  return (
    <div ref={ref} className="w-full h-10 flex items-center justify-center p-4">
      {isLoading && (
        <div className="flex items-center gap-2 text-forest-muted text-xs animate-pulse">
          <div className="w-2 h-2 rounded-full bg-forest-stat animate-bounce"></div>
          <span>Cargando mensajes antiguos...</span>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
