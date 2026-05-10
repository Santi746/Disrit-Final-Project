"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import FriendRequestsList from "../organisms/FriendRequestsList";

const CATEGORIES = [
  { id: "requests", label: "Solicitudes de Amistad", group: "General" },
  // Futuras categorías como "Mensajes", "Menciones", etc.
];

/**
 * El componente NotificationModalTemplate proporciona una interfaz de pantalla completa para 
 * gestionar varios tipos de notificaciones (actualmente solicitudes de amistad).
 * Sigue un diseño de vista dividida con una barra lateral para categorías y un 
 * área de contenido principal para la pestaña seleccionada.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClose - Función callback para cerrar el modal.
 * @returns {JSX.Element|null}
 */
export default function NotificationModalTemplate({ onClose }) {


  const [activeTab, setActiveTab] = useState("requests");
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC para cerrar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Renderiza el contenido según la tab
  const renderContent = () => {
    switch (activeTab) {
      case "requests":
        return <FriendRequestsList />;
      default:
        return (
          <div className="flex justify-center mt-20 text-forest-muted">
            Próximamente...
          </div>
        );
    }
  };

  // Agrupa las categorías
  const groupedCategories = CATEGORIES.reduce((acc, cat) => {
    if (!acc[cat.group]) acc[cat.group] = [];
    acc[cat.group].push(cat);
    return acc;
  }, {});

  const handleTabClick = (id) => {
    setActiveTab(id);
    setShowMobileMenu(false);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 flex bg-forest-dark h-dvh w-screen overflow-hidden"
        style={{ zIndex: 99999 }}
      >
        {/* SIDEBAR (Menú) */}
        <div 
          className={`bg-forest-card h-full py-16 px-6 md:pr-4 border-r border-forest-border shrink-0 overflow-y-auto flex justify-start md:justify-end w-full md:w-1/3 md:min-w-[240px] md:max-w-[300px] ${showMobileMenu ? 'flex' : 'hidden md:flex'}`}
        >
          <div className="w-full max-w-[400px] md:max-w-[220px] flex flex-col gap-6 items-start pb-24 md:pb-0">
            <h1 className="text-forest-light text-sm font-black px-2 uppercase tracking-wide truncate w-full text-left">
              Notificaciones
            </h1>
            
            <div className="flex flex-col gap-6 w-full">
              {Object.entries(groupedCategories).map(([groupName, items]) => (
                <div key={groupName} className="flex flex-col gap-1 w-full">
                  <h3 className="text-forest-muted/70 text-[11px] font-bold tracking-wider px-2 mb-1 uppercase text-left">
                    {groupName}
                  </h3>
                  <div className="flex flex-col gap-1 w-full">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`text-left px-3 py-3 md:py-2 rounded text-[16px] md:text-[15px] font-medium transition-colors w-full ${
                          activeTab === item.id && !showMobileMenu
                            ? "bg-forest-stat text-forest-light" 
                            : "text-forest-light/70 hover:bg-forest-stat/50 hover:text-forest-light"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DERECHO */}
        <div 
          className={`bg-forest-dark h-full pt-8 pb-40 md:pt-16 md:pb-40 px-4 md:pl-10 md:pr-10 overflow-y-auto relative flex-1 w-full ${!showMobileMenu ? 'block' : 'hidden md:block'}`}
        >
          {/* Botón Volver a Menú (Solo Mobile) */}
          <button 
            className="md:hidden flex items-center gap-2 text-forest-muted hover:text-forest-light mb-6 font-bold text-sm tracking-wide transition-colors"
            onClick={() => setShowMobileMenu(true)}
          >
            ← Volver al menú
          </button>

          <div className="max-w-[740px] h-full mx-auto md:mx-0">
            {renderContent()}
          </div>
          
          {/* Botón Cerrar Global (Círculo Flotante) */}
          <div className="absolute top-4 right-4 md:top-16 md:right-16 flex flex-col items-center gap-2 z-50">
            <button
              onClick={onClose}
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
    </AnimatePresence>,
    document.body
  );
}
