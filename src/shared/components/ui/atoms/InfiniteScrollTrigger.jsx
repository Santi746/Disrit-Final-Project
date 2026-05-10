import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SkeletonPulse from "@/shared/components/ui/atoms/SkeletonPulse";

/**
 * @atom InfiniteScrollTrigger
 * @description Componente invisible que actúa como sensor de proximidad.
 * Cuando entra en el campo visual del usuario, dispara fetchNextPage.
 * Usa useEffect en lugar de onChange para evitar el bug del "closure estancado":
 * el onChange capturaba valores viejos de isLoading y disparaba en el momento
 * equivocado, causando un loop de carga automática.
 *
 * @param {Function} onTrigger - Función a ejecutar cuando el componente entra en vista.
 * @param {boolean} hasMore - Indica si hay más datos por cargar.
 * @param {boolean} isLoading - Indica si actualmente se está cargando una página.
 */
const InfiniteScrollTrigger = ({ onTrigger, hasMore, isLoading }) => {

  //  useInView nos da "inView": true cuando el sensor es visible en pantalla, false cuando no.
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // useEffect reacciona cada vez que cambia inView, hasMore o isLoading.
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onTrigger();
    }
  }, [inView, hasMore, isLoading]);

  // Si no hay más páginas, el sensor desaparece del DOM por completo (ni un pixel ocupa).
  if (!hasMore) return null;

  return (
    // El div físico que el navegador observa.
    <div ref={ref} className="w-full flex flex-col">
      {/* Mini-skeletons de mensajes mientras carga el historial */}
      {isLoading && (
        <div className="flex flex-col gap-1 py-2" aria-hidden="true" aria-label="Cargando mensajes anteriores...">
          {/* 3 filas de skeletons: cabecera + 2 compactos */}
          <div className="flex gap-3 px-4 pt-3">
            <SkeletonPulse className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <div className="flex gap-3">
                <SkeletonPulse className="h-3.5 w-20 rounded-md" />
                <SkeletonPulse className="h-2.5 w-12 rounded-md opacity-50" />
              </div>
              <SkeletonPulse className="h-3 w-4/5 rounded-md" />
            </div>
          </div>
          <div className="flex gap-3 px-4 pt-0.5">
            <div className="w-10 shrink-0" />
            <SkeletonPulse className="h-3 w-3/5 rounded-md" />
          </div>
          <div className="flex gap-3 px-4 pt-0.5 pb-1">
            <div className="w-10 shrink-0" />
            <SkeletonPulse className="h-3 w-2/3 rounded-md" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;

