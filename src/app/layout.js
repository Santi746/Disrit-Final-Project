import { Inter } from "next/font/google";
import "@/globals.css";
import SidebarTemplate from "@/features/dashboard/components/templates/SidebarTemplate";
import AOSInit from "@/shared/hooks/AOSInit";
import { NavigationProvider } from "@/shared/context/NavigationContext";
import Providers from "@/shared/components/providers/Providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  name: "Vyntra Web",
  description: "Tu hogar en 1000 Comunidades",
  openGraph: {
    name: "Vyntra Web",
    description: "Tu hogar en 1000 Comunidades",
    type: "website",
  },
};

/**
 * Diseño maestro global de la aplicación.
 * @component RootLayout
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos a renderizar.
 * @returns {React.ReactElement} La estructura HTML principal.
 */
export default function RootLayout({ children }) {
  console.log("VS Code Alert Test");
  return (
    <html lang="es">
      <body className={`bg-forest-dark ${inter.className} antialiased text-white`}>
        <AOSInit />
        
        <Providers>
          <NavigationProvider>
            <SidebarTemplate>
              {children}
            </SidebarTemplate>
          </NavigationProvider>
        </Providers>

        {/* ── PORTAL ROOT ──────────────────────────────────────────────
            Este div vacío es el DESTINO de todos los React Portals.
            Los componentes que usen <Portal> se renderizarán AQUÍ,
            escapando del overflow de sus contenedores padres.
            
            ¿Por qué está al final del body?
            - Para que tenga el z-index más alto naturalmente
            - Para que no interfiera con el layout de la app
            - Para que position: fixed funcione sin problemas
            - (no hay ningún padre con transform aquí)
        */}
        
        <div id="portal-root" />

      </body>
    </html>
  );
}

