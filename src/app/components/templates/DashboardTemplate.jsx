"use client";

import CardinalStar from "../atoms/CardinalStar";
import SearchBar from "../molecules/SearchBar";
import CategoryChips from "../molecules/CategoryChips";
import ClubsFeatured from "../organisms/ClubsFeatured";
import SearchingResults from "../organisms/SearchingResults";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobileDetector from "@/app/hooks/mobileDetector";

/**
 * @component DashboardTemplate
 * @description Contenedor principal para la experiencia de descubrimiento y búsqueda.
 * Gestiona el estado entre la navegación normal (categorías) y la búsqueda activa (resultados).
 * Recibe toda la data a través de props como dicta Atomic Design.
 *
 * @param {Object} props
 * @param {Array} props.featuredClubs - Clubes destacados
 * @param {Array} props.categories - Categorías con sus respectivos clubes
 * @returns {JSX.Element} El diseño animado del dashboard.
 */
export default function DashboardTemplate({
  featuredClubs = [],
  categories = [],
}) {
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useMobileDetector();
  return (
    <>
      {/* EL MOTION CONTENEDOR CEREBRAL */}
      <motion.section
        id="dashboard-top"
        className="relative flex w-full flex-col px-4 pt-6 pb-12 md:px-8 lg:px-12 xl:px-16"
        layout
      >
        {/* Header: Descubre Comunidades */}
        <AnimatePresence mode="wait">
          {(!isMobile || !isSearching) && (
            <motion.div
              key="header"
              className="flex h-[115px] flex-col justify-between gap-4 overflow-hidden px-2 sm:flex-row sm:items-center"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -10, height: 0 }}
            >
              <div className="z-10 flex max-w-full flex-col gap-1.5 overflow-hidden">
                <h1 className="truncate text-[22px] font-extrabold tracking-tight text-white sm:text-[28px] sm:whitespace-normal">
                  Descubre Comunidades
                </h1>
                <p className="text-forest-muted-alt text-[12px] font-medium sm:text-[15px]">
                  Encuentra tu comunidad Ideal y comienza a conectarte
                </p>
              </div>
              {/* Cardinal Star */}
              <CardinalStar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Navigation Area */}
        <motion.div
          className="top-0 z-40 -mx-2 px-2 pt-2 pb-4 backdrop-blur-md"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <SearchBar setIsSearching={setIsSearching} />
        </motion.div>

        {/* Featured Section */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="searching"
              className="mt-4 w-full"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
            >
              <SearchingResults />
            </motion.div>
          ) : (
            <motion.div
              key="featured"
              className="sticky top-0 z-40 -mx-2 px-2 pt-5 pb-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="pb-2">
                <CategoryChips categories={categories} />
              </div>
              <ClubsFeatured
                featuredClubs={featuredClubs}
                categories={categories}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
