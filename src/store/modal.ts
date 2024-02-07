import { create } from 'zustand';

type Modal = {
  modalState: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = create<Modal>()((set) => ({
  modalState: false,
  openModal: () => set(() => ({ modalState: true })),
  closeModal: () => set(() => ({ modalState: false })),
}));
