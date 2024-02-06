import { supabase } from '../supabase/client';

export const getReservation = async () => {
  const { data, error } = await supabase.from('reservations').select();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Reservation not found');
  }

  return data;
};
