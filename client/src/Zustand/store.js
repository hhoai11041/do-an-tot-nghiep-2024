import { create } from "zustand";

const useStore = create((set) => ({
  renderApp: false,
  setRenderHeader: () => set((state) => ({ renderApp: Date.now() })),
  setUserDataZus: (userData) => {
    set({ dataUser: userData });
  },
}));

export default useStore;
