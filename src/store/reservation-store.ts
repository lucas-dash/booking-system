import { create } from 'zustand';

type ReservationStoreType = {
  check_in: string;
  check_out: string;
  guests_count: number;
  setDateRange: (date: { from: string; to: string }) => void;
  setGuests: (count: number) => void;
};

export const useReservationStore = create<ReservationStoreType>((set) => ({
  check_in: '',
  check_out: '',
  guests_count: 0,

  setDateRange: (date) =>
    set(() => ({ check_in: date.from, check_out: date.to })),

  setGuests: (count) => set(() => ({ guests_count: count })),
}));
