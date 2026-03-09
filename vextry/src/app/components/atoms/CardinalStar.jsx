"use client";

export default function () {
    return(
                <div className="relative hidden sm:flex items-center justify-center w-24 h-24 opacity-80" data-aos="zoom-in" data-aos-delay="200">
                    {/* Glow de fondo */}
                    <div className="absolute inset-0 bg-[#22c55e]/10 blur-xl rounded-full"></div>
                    
                    {/* Icono Abstracto de Brújula / Mapa Espacial */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Anillo exterior segmentado que gira despacio */}
                        <svg viewBox="0 0 100 100" className="absolute w-[80%] h-[80%] text-[#22c55e]/40 animate-[spin_15s_linear_infinite_reverse]" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="50" cy="50" r="45" strokeDasharray="10 15" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="35" strokeDasharray="30 10" />
                        </svg>

                        {/* Aguja de la Brújula */}
                        <svg viewBox="0 0 100 100" className="absolute w-[60%] h-[60%] text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth="2">
                            {/* Estrella de norte/sur */}
                            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor" fillOpacity="0.1" strokeLinejoin="round"/>
                            <path d="M50 10 L60 40 L50 50 Z" fill="currentColor" fillOpacity="0.8"/>
                            <path d="M50 90 L40 60 L50 50 Z" fill="currentColor" fillOpacity="0.4"/>
                            
                            {/* Círculo central */}
                            <circle cx="50" cy="50" r="8" fill="#040604" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="3" fill="#22c55e" stroke="none"/>
                        </svg>
                        
                        {/* Destello sutil centro */}
                        <div className="absolute w-2 h-2 bg-white rounded-full blur-[2px] opacity-60"></div>
                    </div>
                </div>
    )
}