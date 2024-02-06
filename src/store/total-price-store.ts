import { create } from 'zustand';

type TotalPriceStoreType = {
  total: number;
  days: number;
  setTotal: (count: number) => void;
  setDays: (range: number) => void;
};

export const useTotalPriceStore = create<TotalPriceStoreType>((set) => ({
  total: 0,
  days: 0,

  setTotal: (count) => set((state) => ({ total: state.total + count })),
  setDays: (range) => set(() => ({ days: range })),
}));
