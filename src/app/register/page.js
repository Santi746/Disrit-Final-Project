"use client";

import React from "react";
import AuthLayout from "@/features/auth/components/molecules/AuthLayout";
import RegisterForm from "@/features/auth/components/organisms/RegisterForm";

/**
 * @page RegisterPage
 * @description Punto de entrada para el registro de nuevos usuarios.
 */
export default function RegisterPage() {
  return (
    <>
      <title>Crear Cuenta | Vyntra</title>
      
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
}
