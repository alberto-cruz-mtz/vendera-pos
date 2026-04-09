import { create } from "zustand";
import type { ActiveModal, ModalManager } from "./types";

export const useModalStore = create<ModalManager>()((set, get) => ({
  activeModal: null,
  isOpen: false,

  open: (type, policy) => {
    const currentModal = get().activeModal;

    if (currentModal && policy === "reject") {
      return false;
    }

    set({ activeModal: { type } as ActiveModal, isOpen: true });
    return true;
  },
  close: () => {
    set({
      activeModal: null,
      isOpen: false,
    });
  },
  replace: (type) => {
    set({ activeModal: { type } as ActiveModal, isOpen: true });
  },
}));
