"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { searchFiltersData } from "../../data/searchFilters.js";

/**
 * @component SearchingResults
 * @description Muestra la interfaz de resultados de búsqueda, con chips de filtros animados y placeholders.
 *
 * @returns {JSX.Element} El contenedor de la vista de resultados.
 */
export default function SearchingResults() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Searching Results
      </h1>

      {/* Filter Chips Container */}
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0">
        {searchFiltersData.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveFilter(option.id)}
            className={`relative flex flex-shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[14px] ${
              activeFilter === option.id
                ? "bg-forest-accent border-forest-accent text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                : "bg-forest-dark-alt/40 border-forest-border/40 text-forest-muted hover:border-forest-muted/40 hover:text-forest-light"
            }`}
          >
            <span
              className={`relative z-10 flex items-center gap-2 ${activeFilter === option.id ? "text-black" : ""}`}
            >
              {option.icon}
              {option.label}
            </span>

            {/* Animated Active Indicator */}
            {activeFilter === option.id && (
              <motion.div
                layoutId="filter-pill"
                className="bg-forest-accent absolute inset-0 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Placeholder */}
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2"
      >
        <div className="bg-forest-dark-alt/20 border-forest-border/50 flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
          <p className="text-forest-muted italic">
            Explore {activeFilter === "all" ? "everything" : activeFilter}{" "}
            matching your search...
          </p>
        </div>
      </motion.div>

      {/* CSS to hide scrollbar but keep functionality */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
