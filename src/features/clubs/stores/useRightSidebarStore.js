import { create } from 'zustand';

/**
 * @store useRightSidebarStore
 * @description Store global para manejar el estado del panel lateral derecho (como el de Miembros).
 * Usamos Zustand para evitar prop-drilling desde HeaderActions hasta ClubChat.
 */
export const useRightSidebarStore = create((set) => ({
  isMembersSidebarOpen: true,
  toggleMembersSidebar: () => set((state) => ({ isMembersSidebarOpen: !state.isMembersSidebarOpen })),
  openMembersSidebar: () => set({ isMembersSidebarOpen: true }),
  closeMembersSidebar: () => set({ isMembersSidebarOpen: false }),
}));
