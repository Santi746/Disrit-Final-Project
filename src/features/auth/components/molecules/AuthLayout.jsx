"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * @component AuthLayout
 * @description Layout envolvente para las pantallas de autenticación (Login/Registro).
 * Proporciona un fondo visualmente atractivo con gradientes y efectos de profundidad.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-forest-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo (Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-forest-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="bg-forest-card/60 backdrop-blur-xl border border-forest-border p-8 sm:p-10 rounded-4xl shadow-2xl">
          {children}
        </div>
      </motion.div>
      
      {/* Footer minimalista */}
      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
        <p className="text-forest-muted/40 text-[11px] font-bold tracking-widest uppercase">
          Vyntra Protocol — Secure Access
        </p>
      </div>
    </div>
  );
}
