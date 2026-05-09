import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function OwnerWarningModal({
  ownerWarningUser,
  setOwnerWarningUser,
  confirmAssign,
}) {
  if (!ownerWarningUser) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-9999999"
        onClick={() => setOwnerWarningUser(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-forest-card border border-yellow-500/40 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-forest-light font-bold text-base">¡Acción Delicada!</h3>
              <p className="text-yellow-400/80 text-xs font-semibold">Rol Owner · Permisos Totales</p>
            </div>
            <button onClick={() => setOwnerWarningUser(null)} className="ml-auto text-forest-muted hover:text-forest-light">
              <X size={18} />
            </button>
          </div>
          <p className="text-forest-muted-alt text-sm leading-relaxed mb-6">
            Estás a punto de asignar el rol <span className="text-yellow-400 font-bold">Owner</span> a <span className="text-forest-light font-bold">{ownerWarningUser.name}</span>.
            Este rol otorga <span className="font-bold text-forest-light">control total</span> del servidor. ¿Estás completamente seguro?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setOwnerWarningUser(null)}
              className="flex-1 py-2 rounded-lg border border-forest-border text-forest-muted hover:text-forest-light hover:border-forest-muted transition-colors text-sm font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={() => confirmAssign(ownerWarningUser.uuid, ownerWarningUser.name)}
              className="flex-1 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black transition-colors"
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
