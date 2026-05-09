"use client";

import DashboardTemplate from "@/features/dashboard/components/templates/DashboardTemplate";
import ClubPreviewModal from "@/features/clubs/components/organisms/ClubPreviewModal";
import { Suspense } from "react";
import UserModal from "@/features/users/components/organisms/UserModal";

/**
 * Página principal de exploración de clubes.
 * @component Explore
 * @returns {React.ReactElement} Vista de la plantilla del dashboard.
 */
export default function Explore() {
  console.log("Git Test");
  console.log("Probando VS Code... random ID: " + Math.random());
  return (
    <>
      <DashboardTemplate />
      <Suspense fallback={null}>
        <ClubPreviewModal  />
      </Suspense>
      <UserModal />
    </>
  );
}
