import { create } from "zustand";

const useStore = create((set) => ({
  dataUser: null,
  renderApp: false,
  setRenderHeader: () => set((state) => ({ renderApp: !state.renderApp })),
  // setUserDataZus: (userData) => set({ dataUser: userData }),
  setUserDataZus: (userData) => {
    console.log("Updating dataUser1:", userData);
    set({ dataUser: userData });
  },
  clearUserData: () => set({ dataUser: null }),
}));

export default useStore;
