"use client";

// =============================================================================
// PORTAL.JSX — Componente Átomo (Atomic Design)
// =============================================================================
//
// ¿QUÉ ES UN PORTAL?
// -------------------
// Un Portal de React permite renderizar un componente en un lugar DIFERENTE
// del DOM al de su componente padre. En el árbol de React sigue siendo hijo
// normal (recibe props, contexto, eventos burbujean hacia arriba), pero en
// el HTML real aparece en otro nodo del DOM.
//
// ¿POR QUÉ LO NECESITAMOS?
// -------------------------
// El SidebarClub tiene `overflow-x-clip` para que el contenido no se desborde
// durante la animación de cierre. Pero eso TAMBIÉN recorta el tooltip, que
// necesita salir hacia la derecha del sidebar.
//
// Con el Portal, el tooltip se renderiza en `<div id="portal-root">` que está
// FUERA del sidebar, así que el overflow no lo afecta.
//
// ANALOGÍA SIMPLE:
// Imagina que el sidebar es una caja con tapa. Todo lo que está dentro de la
// caja se recorta si sobresale. El Portal es como sacar el tooltip de la caja
// y ponerlo directamente sobre la mesa (el body). El tooltip ya no está
// "atrapado" dentro de la caja.
//
// =============================================================================

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * @atom Portal
 * @description Renderiza sus hijos (children) dentro de un nodo del DOM
 *              que existe FUERA de la jerarquía normal del componente padre.
 *
 * @param {React.ReactNode} children - Lo que queremos renderizar en el portal
 *                                      (en nuestro caso, el tooltip).
 *
 * @example
 *   <Portal>
 *     <div className="tooltip">Hola, soy un tooltip libre!</div>
 *   </Portal>
 *   // Esto renderiza el div dentro de <div id="portal-root">,
 *   // NO dentro del componente que contiene este código.
 */
export default function Portal({ children }) {
  // ─── STATE ──────────────────────────────────────────────────────────
  // Guardamos la referencia al nodo del DOM donde vamos a montar el portal.
  // Empieza como `null` porque en el servidor (SSR) no existe el DOM.
  const [portalNode, setPortalNode] = useState(null);

  // ─── EFFECT: BUSCAR EL NODO DESTINO ────────────────────────────────
  // useEffect solo se ejecuta en el CLIENTE (navegador), no en el servidor.
  // Esto es importante porque `document` no existe durante SSR (Server Side
  // Rendering) en Next.js.
  useEffect(() => {
    // Buscamos el <div id="portal-root"> que agregamos en layout.js.
    // Este div es el "destino" donde se montará todo lo que pase por un Portal.
    const node = document.getElementById("portal-root");

    // Si encontramos el nodo, lo guardamos en el state.
    // Si no lo encuentra (olvidaste agregarlo a layout.js), mostramos
    // un warning en la consola para ayudar al debugging.
    if (node) {
      setPortalNode(node);
    } else {
      console.warn(
        "⚠️ Portal: No se encontró <div id='portal-root'> en el DOM. " +
        "Asegúrate de agregarlo en layout.js dentro del <body>."
      );
    }
  }, []); // ← Array vacío = solo se ejecuta UNA VEZ al montar el componente.

  // ─── RENDER ─────────────────────────────────────────────────────────
  // Si aún no tenemos el nodo (estamos en SSR o el nodo no existe),
  // NO renderizamos nada. Esto previene errores en el servidor.
  if (!portalNode) return null;

  // createPortal(qué, dónde):
  //   - qué:   los children (el tooltip)
  //   - dónde: el nodo del DOM donde se va a renderizar (portal-root)
  //
  // Esto es la MAGIA del Portal. Los children se "teletransportan" al
  // portal-root, escapando del overflow del sidebar.
  return createPortal(children, portalNode);
}

