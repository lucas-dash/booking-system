import { create } from 'zustand';

type Nav = {
  active: string;
  setActive: (section: string) => void;
};

export const useNavStore = create<Nav>()((set) => ({
  active: 'Hero',
  setActive: (section) => set(() => ({ active: section })),
}));
