import React from "react";

export default function ClubPreviewCard({ club, name }) {
  return (
    <div className="w-full lg:w-72 shrink-0">
      <label className="text-xs font-bold tracking-widest uppercase text-forest-muted mb-2 block">
        Vista previa
      </label>
      <div className="bg-forest-card border border-forest-border rounded-xl overflow-hidden shadow-card-glow pb-4">
        <div className="relative h-24 w-full bg-forest-border">
          {club?.banner_url && (
            <img 
              src={club.banner_url} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="px-4 relative">
          <div className="absolute -top-6 left-4 h-12 w-12 rounded-xl bg-forest-stat border-2 border-forest-card overflow-hidden">
            {club?.logo_url && (
              <img src={club.logo_url} alt="Logo" className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="pt-8">
            <h3 className="text-forest-light font-bold text-base truncate">{name || "Nombre del Servidor"}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-forest-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-forest-accent"></span>
                {club?.online_count || 0} en línea
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-forest-muted-alt"></span>
                {club?.members_count || 0} miembros
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
