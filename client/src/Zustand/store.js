import { create } from "zustand";

const useStore = create((set) => ({
  renderApp: false,
  setRenderHeader: () => set((state) => { 
    const newRenderApp = !state.renderApp;
    return { renderApp: newRenderApp };
  }),
  setUserDataZus: (userData) => {
    set({ dataUser: userData });
  },
}));

export default useStore;
