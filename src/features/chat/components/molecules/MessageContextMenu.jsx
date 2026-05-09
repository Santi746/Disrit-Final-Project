"use client";

import { motion } from "framer-motion";
import { messageActionItems } from "@/features/chat/data/message_action_items";
import DropdownItem from "@/shared/components/ui/atoms/DropdownItem";

/**
 * @molecule MessageContextMenu
 * @description Menú contextual de mensajes, renderizado desde datos (Anti-Hardcoding).
 *
 * @param {Object} props
 * @param {Function} [props.onAction] - Callback al seleccionar una acción (cierra el menú).
 */
export default function MessageContextMenu({ onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute right-0 top-full z-50 mt-1.5 w-max min-w-[200px] rounded-lg border border-forest-border bg-forest-dark p-1.5 shadow-2xl shadow-black/80"
      role="menu"
    >
      <div className="flex flex-col gap-0.5">
        {messageActionItems.map((item) => (
          <div key={item.uuid}>
            {item.type === "danger" && (
              <hr className="my-1 border-forest-border-faint" />
            )}
            <DropdownItem
              label={item.label}
              iconPath={item.iconPath}
              styles={item.styles}
              onClick={() => {
                onAction?.();
                console.log(`Acción: ${item.uuid}`);
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
