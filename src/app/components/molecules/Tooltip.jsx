"use client";

// =============================================================================
// TOOLTIP.JSX — Componente Molécula (Atomic Design)
// =============================================================================
//
// ¿QUÉ HACE ESTE COMPONENTE?
// ---------------------------
// Muestra un tooltip (etiqueta flotante) al lado de un elemento "ancla".
// Usa el Portal para renderizarse FUERA del sidebar, evitando el recorte
// por overflow.
//
// ¿POR QUÉ ES UNA MOLÉCULA?
// --------------------------
// Porque combina DOS átomos:
//   1. Portal (para escapar del overflow)
//   2. El contenido visual del tooltip (texto + flechita)
// Una molécula = combinación de átomos con una función específica.
//
// ¿CÓMO FUNCIONA LA POSICIÓN?
// ----------------------------
// Usamos `getBoundingClientRect()` del elemento ancla para saber su
// posición exacta en la pantalla. Luego posicionamos el tooltip con
// `position: fixed` respecto al viewport.
//
// Normalmente `fixed` dentro de un contenedor con `transform` se rompe,
// pero como usamos PORTAL, el tooltip está en `#portal-root` (que está
// directamente en el body, sin transforms), así que `fixed` funciona
// perfectamente.
//
// =============================================================================

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../atoms/Portal";

/**
 * @molecule Tooltip
 * @description Tooltip flotante que usa Portal para escapar del overflow.
 *              Se posiciona dinámicamente al lado del elemento ancla.
 *
 * @param {string}  text      - Texto a mostrar en el tooltip.
 * @param {Element} anchorEl  - El elemento del DOM al que se "ancla" el tooltip.
 *                               Obtenido con useRef().current o event.currentTarget.
 * @param {boolean} visible   - Si el tooltip debe mostrarse o no.
 *
 * @example
 *   // En el componente padre:
 *   const [anchorEl, setAnchorEl] = useState(null);
 *
 *   <div
 *     onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
 *     onMouseLeave={() => setAnchorEl(null)}
 *   >
 *     Hover me
 *   </div>
 *
 *   <Tooltip
 *     text="Soy un tooltip"
 *     anchorEl={anchorEl}
 *     visible={!!anchorEl}
 *   />
 */
export default function Tooltip({ text, anchorEl, visible }) {
  // ─── STATE: POSICIÓN DEL TOOLTIP ─────────────────────────────────────
  // Guardamos las coordenadas {top, left} donde se debe mostrar el tooltip.
  // Se calculan a partir de la posición del elemento ancla en la pantalla.
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ─── REF: REFERENCIA AL ELEMENTO DEL TOOLTIP ─────────────────────────
  // Necesitamos medir la ALTURA del tooltip para centrarlo verticalmente.
  //
  // ¿POR QUÉ NO USAMOS translateY(-50%)?
  // ─────────────────────────────────────
  // Framer Motion controla la propiedad `transform` del elemento para
  // aplicar sus animaciones (scale, x, etc.). Si nosotros TAMBIÉN ponemos
  // un transform con translateY(-50%), Framer Motion lo SOBREESCRIBE
  // con su propio transform, y nuestro centrado se pierde.
  //
  // SOLUCIÓN: Medimos la altura del tooltip con un ref y restamos la
  // mitad directamente en el cálculo de `top`. Así no necesitamos
  // ningún transform para centrar, y Framer Motion puede usar
  // transform libremente para sus animaciones.
  //
  //   ANTES (ROTO):
  //     top: rect.top + rect.height/2   ← punto medio del ícono
  //     transform: translateY(-50%)      ← Framer Motion lo borra 💥
  //
  //   AHORA (CORRECTO):
  //     top: rect.top + rect.height/2 - tooltipHeight/2  ← ya centrado ✅
  //     sin transform manual                              ← FM no interfiere ✅
  const tooltipRef = useRef(null);

  // ─── FUNCIÓN: CALCULAR POSICIÓN ──────────────────────────────────────
  // useCallback memoriza la función para que no se recree en cada render.
  // Esto es importante porque la usamos dentro de useEffect.
  const updatePosition = useCallback(() => {
    // Si no hay elemento ancla, no hay nada que calcular.
    if (!anchorEl) return;

    // getBoundingClientRect() devuelve la posición y dimensiones del
    // elemento RELATIVAS AL VIEWPORT (la ventana del navegador visible).
    //
    // Devuelve un objeto con: { top, right, bottom, left, width, height }
    //
    //   ┌──────────── viewport ────────────┐
    //   │                                   │
    //   │      ┌─ rect.top                  │
    //   │      │                            │
    //   │ ─────┼─── [ICONO DEL CLUB] ───    │
    //   │      │    rect.left               │
    //   │      │    rect.width              │
    //   │      │    rect.height             │
    //   │      └─ rect.bottom               │
    //   │                                   │
    //   └───────────────────────────────────┘
    const rect = anchorEl.getBoundingClientRect();

    // Medir la altura del tooltip para centrado vertical.
    // Si el tooltip aún no se ha montado, usamos 0 (primera vez).
    // offsetHeight incluye padding + border + contenido.
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 0;

    setPosition({
      // CENTRAR VERTICALMENTE (sin transform):
      // rect.top + rect.height / 2 = punto medio vertical del ícono
      // - tooltipHeight / 2        = subimos la mitad de la altura del tooltip
      // Resultado: el CENTRO del tooltip coincide con el CENTRO del ícono
      //
      //   ┌──────┐
      //   │ ícono │ ── punto medio ──── ── punto medio ── ┌─────────┐
      //   └──────┘                                         │ tooltip │
      //                                                    └─────────┘
      top: rect.top + rect.height / 2 - tooltipHeight / 2,

      // POSICIONAR A LA DERECHA:
      // rect.right = borde derecho del ícono respecto al viewport
      // + 12 = 12px de espacio entre el ícono y el tooltip (para la flechita)
      left: rect.right + 12,
    });
  }, [anchorEl]); // ← Se recalcula solo si cambia el elemento ancla.

  // ─── EFFECT: ACTUALIZAR POSICIÓN ────────────────────────────────────
  // Cada vez que el tooltip se hace visible o cambia el ancla,
  // recalculamos la posición.
  useEffect(() => {
    if (!visible || !anchorEl) return;

    // Calcular posición inicial inmediatamente
    updatePosition();

    // También recalcular si el usuario hace scroll o resize,
    // porque la posición del ícono puede cambiar.
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    // CLEANUP: Cuando el tooltip se oculta o el componente se desmonta,
    // removemos los listeners para no tener "memory leaks" (fugas de memoria).
    // Si no hacemos esto, se acumularían listeners cada vez que haces hover.
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, anchorEl, updatePosition]);

  // ─── RENDER ─────────────────────────────────────────────────────────
  // El Portal teletransporta todo lo de adentro a #portal-root.
  // AnimatePresence permite animar la entrada Y la salida del tooltip.
  return (
    <Portal>
      <AnimatePresence>
        {visible && (
          <motion.div
            // ── ref para medir la altura del tooltip ──
            ref={tooltipRef}

            // ── Animación de entrada/salida ──
            // initial: estado ANTES de aparecer (invisible, pequeño, a la izquierda)
            // animate: estado VISIBLE (opaco, tamaño normal, en posición)
            // exit: estado al DESAPARECER (vuelve a invisible)
            //
            // NOTA: Usamos las props de Framer Motion (opacity, scale, x)
            // en lugar de inline transform. Así FM controla TODO el transform
            // y no hay conflictos.
            initial={{ opacity: 0, scale: 0.85, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}

            // ── Estilos de posicionamiento ──
            // position: fixed → se posiciona respecto al VIEWPORT
            // top/left → ya incluyen el centrado vertical (sin translateY)
            // pointerEvents: none → no bloquea clicks en otros elementos
            // zIndex: 9999 → siempre por encima de todo
            //
            // ⚠️ NO HAY transform aquí. El centrado vertical se hace
            //    matemáticamente en updatePosition (top - tooltipHeight/2).
            //    Framer Motion usa transform internamente para scale/x.
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              pointerEvents: "none",
              zIndex: 9999,
            }}

            // ── Recalcular posición después de montar ──
            // onAnimationStart se ejecuta cuando FM empieza la animación.
            // En ese punto el tooltip ya existe en el DOM y podemos
            // medir su altura real para ajustar el centrado.
            onAnimationStart={() => updatePosition()}
          >
            {/* ── CONTENIDO DEL TOOLTIP ── */}
            <div className="bg-forest-stat relative rounded px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-xl">
              {text}

              {/* ── FLECHITA (TRIÁNGULO) ── */}
              {/* 
                Esta flechita apunta hacia la izquierda (hacia el ícono).
                Se crea con un truco de CSS usando borders transparentes.
                
                Cómo funciona el truco del triángulo con borders:
                - Un elemento sin ancho ni alto
                - Con 4 borders gruesos
                - 3 borders transparentes + 1 border con color = triángulo
                
                En nuestro caso:
                - border-right tiene color (forma la cara visible)
                - Los otros 3 borders son transparentes
                - Resultado: triángulo apuntando a la IZQUIERDA
                
                Posición:
                - absolute + right-full → pegada al borde izquierdo del tooltip
                - top-1/2 + -translate-y-1/2 → centrada verticalmente dentro del tooltip
              */}
              <div className="border-r-forest-stat absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
