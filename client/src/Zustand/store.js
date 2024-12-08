import { create } from "zustand";

const useStore = create((set) => ({
  renderApp: false,
  setRenderHeader: () => set((state) => { 
    console.log("Previous renderApp:", state.renderApp);
    const newRenderApp = !state.renderApp;
    console.log("Updated renderApp:", newRenderApp);
    return { renderApp: newRenderApp };
  }),
  setUserDataZus: (userData) => {
    set({ dataUser: userData });
  },
}));

export default useStore;
