"use client";

import React from "react";
import AuthLayout from "@/features/auth/components/molecules/AuthLayout";
import LoginForm from "@/features/auth/components/organisms/LoginForm";
import Head from "next/head";

/**
 * @page LoginPage
 * @description Punto de entrada para la autenticación de usuarios.
 * Utiliza el AuthLayout para la presentación visual y LoginForm para la lógica.
 */
export default function LoginPage() {
  return (
    <>
      {/* SEO & Metadata (Client side approach for title) */}
      <title>Iniciar Sesión | Vyntra</title>
      
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
