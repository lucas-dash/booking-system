import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase/client';

const getReservation = async () => {
  const { data, error } = await supabase.from('reservations').select();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Reservation not found');
  }

  return data;
};
export default function useReservation() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: () => getReservation(),
  });
}
