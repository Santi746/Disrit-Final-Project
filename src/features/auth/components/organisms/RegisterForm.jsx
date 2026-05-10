"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/shared/components/ui/atoms/Button";
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de registro (Laravel Breeze / Sanctum Style)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-black text-forest-light tracking-tight mb-2">
          Crea tu cuenta
        </h1>
        <p className="text-forest-muted text-sm font-medium">
          Únete a la comunidad de Vyntra.
        </p>
      </div>

      {/* Social Register */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Registrarse con Google
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-forest-border/50"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black">
          <span className="bg-forest-card px-4 text-forest-muted/60">O completa tus datos</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-muted/60 px-1">
            Nombre Público
          </label>
          <div className="group relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-muted transition-colors group-focus-within:text-forest-accent" size={18} />
            <input
              type="text"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre o nick"
              className="w-full bg-forest-dark/40 border-2 border-forest-border/40 rounded-2xl pl-12 pr-4 py-3.5 text-forest-light placeholder-forest-muted/30 outline-none transition-all focus:border-forest-accent/50 focus:bg-forest-dark/60"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-muted/60 px-1">
            Correo Electrónico
          </label>
          <div className="group relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-muted transition-colors group-focus-within:text-forest-accent" size={18} />
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full bg-forest-dark/40 border-2 border-forest-border/40 rounded-2xl pl-12 pr-4 py-3.5 text-forest-light placeholder-forest-muted/30 outline-none transition-all focus:border-forest-accent/50 focus:bg-forest-dark/60"
            />
          </div>
        </div>

        {/* Password Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-muted/60 px-1">
              Contraseña
            </label>
            <div className="group relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-muted transition-colors group-focus-within:text-forest-accent" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-forest-dark/40 border-2 border-forest-border/40 rounded-2xl pl-12 pr-4 py-3.5 text-forest-light placeholder-forest-muted/30 outline-none transition-all focus:border-forest-accent/50 focus:bg-forest-dark/60"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-forest-muted/60 px-1">
              Confirmar
            </label>
            <div className="group relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-muted transition-colors group-focus-within:text-forest-accent" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-forest-dark/40 border-2 border-forest-border/40 rounded-2xl pl-12 pr-4 py-3.5 text-forest-light placeholder-forest-muted/30 outline-none transition-all focus:border-forest-accent/50 focus:bg-forest-dark/60"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-forest-accent hover:bg-forest-light text-forest-dark font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.15)] flex items-center justify-center gap-2 group"
        >
          {isLoading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-forest-dark border-t-transparent rounded-full" />
          ) : (
            <>
              Empezar ahora
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center mt-2">
        <p className="text-forest-muted text-xs font-medium">
          ¿Ya tienes una cuenta?{" "}
          <button 
            type="button" 
            onClick={() => router.push("/login")}
            className="text-forest-accent font-black hover:text-forest-light transition-colors underline underline-offset-4 decoration-forest-accent/30"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </form>
  );
}
