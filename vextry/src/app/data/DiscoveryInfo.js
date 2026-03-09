
import React from "react";

/**
 * @file DiscoveryInfo.js
 * @description Sigue la misma lógica que sidebarInfo.js.
 * Un solo array de objetos que define las categorías de Dashboard.
 */

export const discoveryInfo = [
    {
        id: 1,
        name: "Technologies & Engineering",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#22c55e]">
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="m3 15 2 2 4-4"></path>
            </svg>
        ),
        // Aquí puedes poner una lista diferente si quieres
    },
    {
        id: 2,
        name: "Gaming & Video Games",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#22c55e]">
                <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                <path d="M6 12h4m-2-2v4"></path>
                <path d="M15 11h.01m2.99 2h.01"></path>
            </svg>
        ),
    },
    {
        id: 3,
        name: "Startups & Business",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#22c55e]">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        ),
    }
];
