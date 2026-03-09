"use client";

export default function Sidebar({name, icon, className}) {
    // Si no hay nombre (es el logo), cancelamos el hover verde.
    const bgHover = name ? "hover:bg-[#1c7e42]" : "hover:bg-transparent";

    return (
        <div className={`group relative flex-col items-center gap-1 text-[#9ca3af] hover:text-white cursor-pointer transition-all p-2 md:px-4 rounded-lg ${bgHover} ${className}`}>
            {icon}
            
            {/* Texto normal visible en móvil, oculto en PC */}
            <span className="text-[10px] md:hidden">{name}</span>

            {/* Tooltip (miniventanita) visible solo en PC al hacer hover */}
            {name && (
                <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-[#1c7e42] px-3 py-1.5 text-xs font-semibold text-white opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 shadow-md whitespace-nowrap z-50 hidden md:block">
                    {name}
                    {/* Flechita del tooltip */}
                    <div className="absolute right-full top-1/2 -mt-1 border-4 border-transparent border-r-[#1c7e42]"></div>
                </div>
            )}
        </div>
    )
}


