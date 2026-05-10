"use client";

import DMTemplate from "@/features/chat/components/templates/DMTemplate";
import UserModal from "@/features/users/components/organisms/UserModal";
import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";

/**
 * Layout para la sección de Mensajes Directos.
 * Envuelve todas las páginas de /channels/@me con el DMTemplate
 * y los modales globales necesarios.
 *
 * @component DMLayout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página.
 * @returns {React.ReactElement}
 */
export default function DMLayout({ children }) {
  const params = useParams();
  
  // Validamos que el segmento dinámico sea exactamente @me (o su versión codificada %40me)
  // Si no lo es, devolvemos un 404 porque esta ruta solo es para MD.
  if (params.dmRoute !== "@me" && params.dmRoute !== "%40me") {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <DMTemplate>
        {children}
      </DMTemplate>
      <UserModal />
    </Suspense>
  );
}
