import { create } from "zustand";

const UseSubscribeModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseSubscribeModal;
