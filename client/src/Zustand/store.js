import { create } from "zustand";

const useStore = create((set) => ({
  renderApp: false,
  setRenderHeader: () => set((state) => ({ renderApp: !state.renderApp })),
  setUserDataZus: (userData) => set({ dataUser: userData }),
}));

export default useStore;
