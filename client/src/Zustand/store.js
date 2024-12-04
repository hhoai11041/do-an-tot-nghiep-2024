import { create } from "zustand";

const useStore = create((set) => ({
  renderApp: false,
  setRenderHeader: (value) => set({ renderApp: !value }),
  setUserDataZus: (userData) => set({ dataUser: userData }),
}));

export default useStore;
