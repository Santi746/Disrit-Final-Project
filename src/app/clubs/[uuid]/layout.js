import ClubTemplate from "@/features/clubs/components/templates/ClubTemplate";
import UserModal from "@/features/users/components/organisms/UserModal";
import ClubPreviewModal from "@/features/clubs/components/organisms/ClubPreviewModal";
import { Suspense } from "react";

export const metadata = {
  name: "Club - Vyntra Web",
  description: "Página principal del club en Vyntra Web",
};

/**
 * Layout general para las páginas relacionadas a clubes.
 * Incluye UserModal y ClubPreviewModal para que ambos modales funcionen
 * desde cualquier página del club sin navegar fuera de la ruta actual.
 *
 * @component ClubLayout
 * @param {Object} props - Propiedades del layout.
 * @param {React.ReactNode} props.children - Contenido de la página del club.
 * @returns {React.ReactElement}
 */
export default function ClubLayout({ children }) {
    return (
        <>
            <ClubTemplate>
                {children}
            </ClubTemplate>
            <UserModal />
            <ClubPreviewModal />
        </>
    );
}