"use client";

/**
 * @file UserSettingsTemplate.jsx
 * @description Template full-screen para la configuración del usuario.
 * Se renderiza como un portal a nivel de `document.body`, activado por
 * el query param `?settings=user` en la URL.
 *
 * Layout: sidebar izquierda con categorías agrupadas + contenido desplazable
 * a la derecha. En móvil navega entre menú y contenido en 2 pasos.
 *
 * Sigue el patrón establecido en ClubSettingsTemplate para coherencia visual.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import MyAccountSettings from "../organisms/settings/MyAccountSettings";
import AppearanceSettings from "../organisms/settings/AppearanceSettings";
import SecuritySettings from "../organisms/settings/SecuritySettings";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { FiUser, FiSun, FiShield } from "react-icons/fi";

/** @type {Array<{id: string, label: string, icon: React.ReactNode, group: string}>} */
const CATEGORIES = [
  { id: "account",    label: "Mi cuenta",   icon: <FiUser size={15} />,   group: "Ajustes de Usuario" },
  { id: "appearance", label: "Apariencia",  icon: <FiSun size={15} />,    group: "Ajustes de App" },
  { id: "security",   label: "Seguridad",   icon: <FiShield size={15} />, group: "Ajustes de App" },
];

export default function UserSettingsTemplate() {
  const [activeTab, setActiveTab] = useState("account");
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = useQueryString();

  const isOpen = searchParams.get("settings") === "user";

  useEffect(() => { setMounted(true); }, []);

  const handleClose = () => {
    const url = createQueryString("settings", null);
    router.replace(url, { scroll: false });
  };

  // ESC para cerrar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  /** Renderiza el panel de contenido según la pestaña activa. */
  const renderContent = () => {
    switch (activeTab) {
      case "account":    return <MyAccountSettings />;
      case "appearance": return <AppearanceSettings />;
      case "security":   return <SecuritySettings />;
      default:           return null;
    }
  };

  /** Agrupa las categorías por su campo `group`. */
  const groupedCategories = CATEGORIES.reduce((acc, cat) => {
    if (!acc[cat.group]) acc[cat.group] = [];
    acc[cat.group].push(cat);
    return acc;
  }, {});

  const handleTabClick = (id) => {
    setActiveTab(id);
    setShowMobileMenu(false);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="user-settings-modal"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 flex bg-forest-dark h-dvh w-screen overflow-hidden"
          style={{ zIndex: 99999 }}
        >
          {/* ── SIDEBAR (Menú) ── */}
          <div
            className={`bg-forest-card h-full py-10 sm:py-16 px-4 sm:px-6 md:pr-4 border-r border-forest-border shrink-0 overflow-y-auto flex justify-start md:justify-end w-full md:w-[260px] md:min-w-[220px] md:max-w-[280px] ${
              showMobileMenu ? "flex" : "hidden md:flex"
            }`}
          >
            <div className="w-full max-w-[400px] md:max-w-[200px] flex flex-col gap-6 items-start pb-24 md:pb-0">
              <h1 className="text-forest-light text-sm font-black px-2 uppercase tracking-wide truncate w-full text-left">
                Ajustes de Usuario
              </h1>

              <div className="flex flex-col gap-5 w-full">
                {Object.entries(groupedCategories).map(([groupName, items]) => (
                  <div key={groupName} className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-forest-muted/70 text-[11px] font-bold tracking-wider px-2 mb-1 uppercase text-left">
                      {groupName}
                    </h3>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`text-left px-3 py-2 rounded text-[14px] sm:text-[15px] font-medium transition-colors w-full flex items-center gap-2.5 ${
                          activeTab === item.id && !showMobileMenu
                            ? "bg-forest-stat text-forest-light"
                            : "text-forest-muted hover:bg-forest-stat/40 hover:text-forest-light"
                        }`}
                      >
                        <span className={activeTab === item.id && !showMobileMenu ? "text-forest-accent" : ""}>
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTENIDO PRINCIPAL ── */}
          <div
            className={`bg-forest-dark h-full pt-6 sm:pt-8 md:pt-16 px-3 sm:px-4 md:px-12 overflow-y-auto flex-1 ${
              !showMobileMenu ? "block" : "hidden md:block"
            }`}
          >
            {/* Botón Volver (solo mobile) */}
            <button
              className="md:hidden flex items-center gap-2 text-forest-muted hover:text-forest-light mb-4 font-bold text-sm tracking-wide transition-colors"
              onClick={() => setShowMobileMenu(true)}
            >
              ← Volver al menú
            </button>

            <div className="max-w-[680px] mx-auto pb-32">
              {renderContent()}
            </div>

            {/* Botón Cerrar */}
            <div className="absolute top-4 right-3 sm:right-4 md:top-16 md:right-16 flex flex-col items-center gap-2 z-50">
              <button
                onClick={handleClose}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-forest-muted-alt bg-forest-dark text-forest-muted-alt flex items-center justify-center hover:bg-forest-danger hover:text-white hover:border-forest-danger transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
              <span className="text-[11px] md:text-[13px] font-bold text-forest-muted-alt tracking-widest uppercase hidden md:block">
                ESC
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal-root") || document.body
  );
}
