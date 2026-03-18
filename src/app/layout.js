import { Inter } from "next/font/google";
import "@/globals.css";
import SidebarTemplate from "./components/templates/SidebarTemplate";
import AOSInit from "@/app/hooks/AOSInit";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Vyntra Web",
  description: "Tu hogar en 1000 Comunidade",
};

/**
 * @layout RootLayout
 * @description Diseño maestro global.
 * Se ha simplificado la llamada al Sidebar gracias a la modularización atómica.
 */
import { NavigationProvider } from "./context/NavigationContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-forest-dark ${inter.className} antialiased text-white`}>
        <AOSInit />
        
        <NavigationProvider>
          <SidebarTemplate>
            {children}
          </SidebarTemplate>
        </NavigationProvider>

        {/* ── PORTAL ROOT ──────────────────────────────────────────────
            Este div vacío es el DESTINO de todos los React Portals.
            Los componentes que usen <Portal> se renderizarán AQUÍ,
            escapando del overflow de sus contenedores padres.
            
            ¿Por qué está al final del body?
            - Para que tenga el z-index más alto naturalmente
            - Para que no interfiera con el layout de la app
            - Para que position: fixed funcione sin problemas
              (no hay ningún padre con transform aquí)
        */}
        <div id="portal-root" />

      </body>
    </html>
  );
}